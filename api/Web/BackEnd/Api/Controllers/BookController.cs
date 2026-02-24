using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using Web.BackEnd.Api.Attribute;
using Web.BackEnd.Api.Dto;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class BookController : ControllerBase {
		readonly BookManager Manager;
		readonly PopularSearchManager PopularSearchManager;
		readonly ILogger Logger;
		public BookController(BookManager bookManager, ILogger<BookController> logger, PopularSearchManager popularSearchManager) {
			Manager = bookManager;
			Logger = logger;
			this.PopularSearchManager = popularSearchManager;
		}
		[HttpGet("GetBooks")]
		public async Task<JsonResult> GetBooks(string id) {
			HttpResult<IEnumerable<Book>>? result = new();
			try {
				result.StatusCode = 200;
				result.Data = await Manager.GetBooks(id.Split('_').Where(x => x.Length > 2)
					?.Select(x => x)?.ToArray());
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		List<FilterCondition> OrganizeFilters(
			string[]? educationGroup = null,
			int? authorId = null,
			string[]? year = null,
			string[]? publisherId = null,
			string[]? topicId = null,
			string[]? themeId = null,
			string[]? gainId = null,
			string? name = null,
			string? exId = null) 
		{
			List<FilterCondition> filters = new();
			if(educationGroup?.Any() ?? false)
				filters.AddRange(educationGroup.Select(x => new FilterCondition {
					ColumnName = "EducationGroup",
					Operator = "&",
					Value = x
				}));
			if(year?.Any() ?? false)
				filters.AddRange(year.Select(x => new FilterCondition {
					ColumnName = "Year",
					Value = x
				}));
			if(topicId?.Any() ?? false)
				filters.AddRange(topicId.Select(x => new FilterCondition {
					ColumnName = "TopicId",
					Value = x
				}));
			if(authorId != null)
				filters.Add(new FilterCondition {
					ColumnName = "AuthorIds",
					Value = authorId.ToString()
				});
			if(themeId?.Any() ?? false)
				filters.AddRange(themeId.Select(x => new FilterCondition {
					ColumnName = "ThemeIds",
					Value = x
				}));
			if(gainId?.Any() ?? false)
				filters.AddRange(gainId.Select(x => new FilterCondition {
					ColumnName = "GainIds",
					Value = x
				}));
			if(name?.Length > 2) {
				string groupid = Guid.NewGuid().ToString();
				filters.Add(new FilterCondition {
					ColumnName = "Name",
					Value = name.ToUpperInvariant(),
					Operator = "~",
					GroupAnd = true,
					GroupId = groupid,
					SubFilters = new List<FilterCondition>() {
							new FilterCondition {
								ColumnName = "Keywords",
								Value = name.ToUpperInvariant(),
								Operator = "~",
								GroupAnd = true,
								GroupId = groupid + 'A',
								SubFilters = new List<FilterCondition>() {
									new FilterCondition {
										ColumnName = "Name",
										Value = name.ToLowerInvariant(),
										Operator = "~",
										GroupAnd = true,
										GroupId = groupid + 'B',
										SubFilters = new List<FilterCondition>() {
											new FilterCondition {
												ColumnName = "Keywords",
												Value = name.ToLowerInvariant(),
												Operator = "~"
											}
										}
									}
								}
							}
						}
				});
			}
			//if(authorId != null) {
			//	var bookIds = await Manager.GetBookIdsByAuthor(authorId.Value);
			//	if(bookIds?.Any() ?? false) {
			//		string groupid = Guid.NewGuid().ToString();
			//		filters.AddRange(bookIds.Select(x => new FilterCondition {
			//			ColumnName = "Id",
			//			GroupAnd = true,
			//			GroupId = groupid,
			//			Value = x
			//		}));
			//	}
			//}
			if(!string.IsNullOrEmpty(exId))
				filters.Add(new FilterCondition {
					ColumnName = "Id",
					Operator = "!=",
					Value = exId
				});
			if(publisherId?.Any() ?? false)
				filters.AddRange(publisherId.Select(x => new FilterCondition {
					ColumnName = "PublisherId",
					Value = string.Concat(x[0].ToString().ToUpper(), x.AsSpan(1))
				}));
			filters.ExcludeHiddenRecords();
			filters.Add(new FilterCondition {
				ColumnName = "Flags",
				Operator = "!&",
				Value = "256",
				GroupAnd = true,
				GroupId = Guid.NewGuid().ToString()
			});
			return filters;
		}


		[HttpGet("Find")]
		public async Task<JsonResult> Find(string? language = null,
		//[FromQuery(Name = "age")] string[]? ageGroup = null,
		[FromQuery(Name = "eg")] string[]? educationGroup = null,
		//[FromQuery(Name = "minp")] int minPrice = 0,
		//[FromQuery(Name = "maxp")] int maxPrice = int.MaxValue,
		[FromQuery(Name = "a")] int? authorId = null,
		[FromQuery(Name = "y")] string[]? year = null,
		[FromQuery(Name = "p")] string[]? publisherId = null,
		[FromQuery(Name = "c")] string[]? topicId = null,
		[FromQuery(Name = "t")] string[]? themeId = null,
		[FromQuery(Name = "g")] string[]? gainId = null,
		[FromQuery(Name = "name")] string? name = null,
		[FromQuery(Name = "ex")] string? exId = null,
		[FromQuery(Name = "pg")] int page = 1,
		[FromQuery(Name = "ps")] int pageSize = 50,
		[FromQuery(Name = "sc")] string? sortcolumn = "createdatetime",
		[FromQuery(Name = "sd")] bool sortdirection = false) {
			HttpResult<List<BookLight>>? result;
			try {
				bool hasFilter = false;
				if(page == 1 && ((publisherId?.Any() ?? false) || !string.IsNullOrEmpty(name) || (authorId > 0) ||
					(topicId?.Any() ?? false) || (themeId?.Any() ?? false) || (gainId?.Any() ?? false)))
					hasFilter = true;
				var filters = OrganizeFilters(educationGroup, authorId, year, publisherId, topicId, themeId, gainId, name, exId);
				string sort = sortcolumn + (sortdirection ? string.Empty : " desc");
				DBReturnObject<List<Book>>? data = null;
				//if(hasFilter)
				data = await Manager.Filter(filters, page, pageSize, sort);
				//else
				//data = await Manager.SelectMany(page, pageSize, sort);
				List<Book>? books = data?.Data;
				if(hasFilter && (books?.Any() ?? false))
					PopularSearchManager.PushPopularSearchBookItems(books);
				if(books?.Any() ?? false) {
					List<int> authorIds = new();
					foreach(Book book in books)
						if(book.AuthorIds?.Any() ?? false) {
							foreach(int id in book.AuthorIds)	
								if(!authorIds.Contains(id))
									authorIds.Add(id);
						}
					var authors = await (Manager as BookManager).GetAuthorNamesByIds(authorIds);
					books.ForEach(b => {
						b.Authors = authors?.Where(x => b.AuthorIds?.Contains(x.Id) ?? false)?.Select(x => x.Name)?.ToList();
					});
					result = new HttpResult<List<BookLight>> {
						Data = books.Select(x => new BookLight {
							Id = x.Id,
							Isbn = x.Isbn,
							Name = x.Name,
							Authors = x.Authors,
							ThemeIds = x.ThemeIds,
							EducationGroup = x.EducationGroup
						}).ToList(),
						TotalRecords = data?.TotalCount ?? 0,
						StatusCode = 200
					};
				}
				result = new HttpResult<List<BookLight>> {
					Data = books.Select(x => new BookLight {
						Id = x.Id,
						Isbn = x.Isbn,
						Name = x.Name,
						Authors = x.Authors,
						ThemeIds = x.ThemeIds,
						EducationGroup = x.EducationGroup
					}).ToList(),
					TotalRecords = data?.TotalCount ?? 0,
					StatusCode = 200
				};
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result = new HttpResult<List<BookLight>> {
					Message = mex.Message,
					StatusCode = mex.StatusCode ?? 700
				};
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result = new HttpResult<List<BookLight>> {
					StatusCode = 666
				};
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpGet("GetFilters")]
		public async Task<JsonResult> GetFilters(
			[FromQuery(Name = "eg")] string[]? educationGroup = null,
			[FromQuery(Name = "a")] int? authorId = null,
			[FromQuery(Name = "y")] string[]? year = null,
			[FromQuery(Name = "p")] string[]? publisherId = null,
			[FromQuery(Name = "c")] string[]? topicId = null,
			[FromQuery(Name = "t")] string[]? themeId = null,
			[FromQuery(Name = "g")] string[]? gainId = null,
			[FromQuery(Name = "name")] string? name = null,
			[FromQuery(Name = "ex")] string? exId = null,
			[FromQuery(Name = "pg")] int page = 1,
			[FromQuery(Name = "ps")] int pageSize = 50,
			[FromQuery(Name = "sc")] string? sortcolumn = "createdatetime",
			[FromQuery(Name = "sd")] bool sortdirection = false
		) {
			HttpResult<BookFilterDto>? result = new();
			try {
				result.StatusCode = 200;
				var filters = OrganizeFilters(educationGroup, authorId, year, publisherId, topicId, themeId, gainId, name, exId);
				result.Data = await (Manager as BookManager).GetFilters(filters);
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpGet("GetPopular")]
		public async Task<JsonResult> GetPopular(int? count = 5) {
			HttpResult<IEnumerable<PopularItem>>? result = new();
			try {
				if(count < 1)
					count = 1;
				result.StatusCode = 200;
				var data = PopularSearchManager.GetPopularBooks(count.Value).ToList();
				if(data?.Any() ?? false) {
					var filters = new List<FilterCondition>();
					filters.AddRange(data.Select(x => new FilterCondition {
						ColumnName = "Id",
						Value = x.Id
					}));
					var books = (await Manager.Filter(filters, 1, data.Count()))?.Data;
					if(books?.Any() ?? false) {
						List<int> authorIds = new();
						foreach(Book book in books)
							if(book.AuthorIds?.Any() ?? false) {
								foreach(int id in book.AuthorIds)
									if(!authorIds.Contains(id))
										authorIds.Add(id);
							}
						var authors = await (Manager as BookManager).GetAuthorNamesByIds(authorIds);
						books.ForEach(b => {
							b.Authors = authors?.Where(x => b.AuthorIds?.Contains(x.Id) ?? false)?.Select(x => x.Name)?.ToList();
						});
						data.ForEach(d => {
							d.Authors = books.FirstOrDefault(x => x.Id == d.Id)?.Authors;
						});
					}
				}
				result.Data = data;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}

		[HttpGet("GetQuestion")]
		[UserAuth]
		public async Task<HttpResult<BookQuiz?>> GetQuestion(string? language, string id) {
			HttpResult<BookQuiz> result = new();
			try {
				string userId = this.GetUserId();
				var quiz = userId.StartsWith("U-") ? (await Manager.GetQuizQuestions(id, userId, this.GetGroupId()))?.FirstOrDefault() : null;
				result.StatusCode = 200;
				result.Data = quiz;
				result.TotalRecords = quiz != null ? 1 : 0;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}


		[HttpGet("GetMinYear")]
		public async Task<HttpResult<short>> GetMinYear(string? language) {
			HttpResult<short> result = new();
			try {
				result.StatusCode = 200;
				result.Data = await BookManager.GetMinYear();
				result.TotalRecords = 1;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}

		[HttpGet("GetQuestions")]
		[Authorize]
		public async Task<HttpResult<List<BookQuiz>>?> GetQuestions(string? language, string id) {
			HttpResult<List<BookQuiz>> result = new();
			try {
				string userId = this.GetUserId();
				var quiz = userId.StartsWith("U-") ? await Manager.GetQuizQuestions(id, userId, this.GetGroupId()) : null;
				result.StatusCode = 200;
				result.Data = quiz;
				result.TotalRecords = quiz?.Count ?? 0;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}

		[HttpGet("GetSchoolBooks")]
		[UserAuth]
		public async Task<HttpResult<List<Book>>?> GetSchoolBooks(int page = 1, int pageSize = 50, string? phrase = null) {
			HttpResult<List<Book>> result = new();
			try {
				List<FilterCondition> filters = new();
				string userId = this.GetUserId();
				bool demo = this.IsDemoAcc();
				if(!demo) {
					short? educationGroup = 15;
					//this.GetEducationGroupId();
					if(educationGroup == null || (!userId.StartsWith("U-") &&
						!userId.StartsWith("S-")))
						throw new UnauthorizedAccessException();
					filters.Add(new FilterCondition {
						ColumnName = "EducationGroup",
						Operator = "&",
						Value = educationGroup.Value.ToString()
					});
					filters.Add(new FilterCondition {
						ColumnName = "Flags",
						Operator = "!&",
						Value = "256"
					});
					//if(userId.StartsWith("U-API-"))
					//	filters.Add(new FilterCondition {
					//		ColumnName = "Flags",
					//		GroupId = Guid.NewGuid().ToString(),
					//		Operator = "&",
					//		Value = "512"
					//	});
				}
				if(phrase != null) {
					phrase = phrase.Trim();
					if(phrase.Length > 2) {
						LogKeeper.LogInfo(phrase);
						filters.Add(new FilterCondition {
							ColumnName = "Keywords",
							Operator = "~",
							Value = phrase
						});
					}
				}
				filters.ExcludeHiddenRecords();

				var books = (await Manager.Filter(filters, page, pageSize, "Createdatetime desc"));
				result.StatusCode = 200;
				result.Data = books?.Data;
				result.TotalRecords = books?.TotalCount ?? 0;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}

		[HttpPost("SaveQuizAnswer")]
		[Authorize]
		public async Task<HttpResult<BookQuizAnswer?>> SaveQuizAnswer(BookQuizAnswer answer) {
			HttpResult<BookQuizAnswer?> result = new();
			try {
				result.Data = await Manager.SaveQuizAnswer(answer);
				result.StatusCode = 200;
				result.TotalRecords = result.Data != null ? 1 : 0;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}

		[HttpGet("Get")]
		public async Task<HttpResult<BookDto>?> Get(string? language, string id) {
			HttpResult<BookDto> result = new();
			try {
				var book = await Manager.Get(id, true);
				if(book != null) {
					result.StatusCode = 200;
					result.Data = new BookDto {
						Language = book.Language,
						Flags = book.Flags.Value,
						IsEpub = !book.IsEpub.HasValue || (book.IsEpub.HasValue && book.IsEpub.Value)
					};
					result.TotalRecords = 1;
				}
				else
					throw new MyException("Kitap Bulunamadı");
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}
		[HttpGet("GetBookDetail")]
		public async Task<HttpResult<Book>?> GetBookDetail(string? language, string id) {
			HttpResult<Book> result = new();
			try {
				var book = await Manager.Get(id, true);
				if(book != null) {
					string userId = this.GetUserId();
					if(userId != null && userId.StartsWith("U-API-")) {
						if((book.Flags & 512) == 0 && (book.Flags & 256) == 0)
							book.Flags += 256;
					}
					result.StatusCode = 200;
					result.Data = book;
					result.TotalRecords = 1;
				}
				else
					throw new MyException("Kitap Bulunamadı");
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.StatusCode = 700;
				result.Message = mex.Message;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return result;
		}
		[HttpGet("Related")]
		public async Task<JsonResult> Related(string id, int count = 4) {
			HttpResult<List<Book>>? result = new();
			try {
				if(count < 4)
					count = 4;
				else if(count > 20)
					count = 20;
				if(string.IsNullOrEmpty(id))
					throw new MyException("Geçersiz ID");
				var item = await Manager.GetRelatedBooks(id, count);
				result.StatusCode = 200;
				result.Data = item;
			}
			catch(MyException mex) {
				if(mex.Log)
					Logger.LogError(mex);
				result.Message = mex.Message;
				result.StatusCode = mex.StatusCode ?? 700;
			}
			catch(Exception ex) {
				Logger.LogError(ex);
				result.StatusCode = 666;
			}
			return new JsonResult(result, Settings.options);
		}
	}
}