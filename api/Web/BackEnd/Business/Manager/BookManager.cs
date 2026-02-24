using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Business.Manager {
	public class BookManager : BusinessBase<Book, string?> {
		readonly BookQuizManager BookQuizManager;
		readonly ContributorManager ContributorManager;
		public BookManager(BookQuizManager bookQuizManager,
			ContributorManager contributorManager) {
			BookQuizManager = bookQuizManager;
			ContributorManager = contributorManager;
		}

		public async Task<List<Contributor>?> GetAuthorNamesByIds(List<int> authorIds) {
			var result = (await ContributorManager.Filter(authorIds.Select(x =>
				new FilterCondition {
					ColumnName = _primaryKeyColumnName,
					Value = x.ToString()
				})))?.Data;
			var ids = authorIds.ToArray();
			return result?.OrderBy(x => Array.IndexOf(ids, x.Id))?.ToList();
		}

		public async Task<List<string>?> GetBookIdsByAuthor(int authorId) {
			return (await Filter(new List<FilterCondition> {
				new FilterCondition {
					ColumnName = "AuthorIds",
					Value = authorId.ToString()
				} }))?.Data?.Select(x => x.Id)?.ToList();
		}
		public async Task<BookQuiz?> GetSingleQuiz(string id) {
			try {
				return await BookQuizManager.Get(new Guid(id));
			}
			catch {
				return null;
			}
		}
		public async Task<List<BookQuiz>?> GetQuizQuestions(string bookId, string clientId, string companyId) {
			var answers = await BookQuizManager.GetQuizAnswers(bookId, clientId);
			var bookQuizIds = answers?.Select(x => x.BookQuizId)?.Distinct()?.ToArray();
			var filters = new List<FilterCondition> {
				new FilterCondition {
					ColumnName = "bookid",
					Value = bookId
				},
				new FilterCondition {
					ColumnName = "flags",
					Operator = "!&",
					Value = "128"
				},
				new FilterCondition {
					ColumnName = "companyid",
					Value = companyId
				}
			};

			var result = (await BookQuizManager.Filter(filters, sort: "random()"))?.Data;
			if(bookQuizIds?.Any() ?? false)
				result = result?.Where(x => !bookQuizIds.Contains(x.Id.ToString()))?.ToList();
			return result;
		}

		public async Task<BookQuizAnswer?> SaveQuizAnswer(BookQuizAnswer answer) {
			var quiz = await GetSingleQuiz(answer.BookQuizId);
			if(quiz != null) {
				answer.RightAnswered = (answer.GivenAnswer == quiz.RightChoice);
				return await BookQuizManager.SaveGivenAnswer(answer);
			}
			return null;
		}

		public async Task<List<Book>?> GetRelatedBooks(string bookId, int count) {
			var book = await Get(bookId, true);
			var filters = new List<FilterCondition> {
				new FilterCondition{
					ColumnName = _primaryKeyColumnName,
					Operator = "!=",
					Value = bookId
				}
			};
			if(book?.ThemeIds?.Any() ?? false)
				filters.AddRange(book.ThemeIds.Select(x => new FilterCondition {
					ColumnName = "ThemeIds",
					Value = x.ToString()
				}));
			filters.ExcludeHiddenRecords();
			return (await base.Filter(filters, 1, count))?.Data;
		}
		public async Task<IEnumerable<Book>?> GetBooks(string[] ids) {
			if(!(ids?.Any() ?? false))
				throw new MyException("Geçersiz ID");
			var filters = ids.Select(x => new FilterCondition {
				ColumnName = _primaryKeyColumnName,
				Value = x
			}).ToList();
			filters.ExcludeHiddenRecords();
			var result = (await base.Filter(filters))?.Data;
			return result?.OrderBy(x => Array.IndexOf(ids, x.Id));
		}

		public static async Task<short> GetMinYear() {
			Database db = new();
			var result = await db.Execute("MinBookYear");
			if(result != null)
				return Convert.ToInt16(result);
			return Convert.ToInt16(DateTime.Now.Year);
		}

		public async Task<BookFilterDto?> GetFilters(List<FilterCondition> filters) {
			var data = (filters?.Any() ?? false) ? (await base.Filter(filters))?.Data : (await base.SelectMany())?.Data;
			if(data?.Any() ?? false) {
				var result = new BookFilterDto();
				foreach(var item in data) {
					result.Years ??= new();
					result.Publishers ??= new();
					result.Categories ??= new();
					result.EducationGroups ??= new();
					result.Themes ??= new();
					if(item.ThemeIds != null)
						foreach(var i in item.ThemeIds) {
							var current = result.Themes.FirstOrDefault(x => x.Id == i.ToString());
							if(current == null)
								result.Themes.Add(new BookFilterItem { Id = i.ToString(), Count = 1 });
							else
								current.Count++;
						}
					if(item.EducationGroup > 0)
						for(int j = 1; j < 16; j *= 2) {
							var current = result.EducationGroups.FirstOrDefault(x => x.Id == j.ToString());
							if(current == null)
								result.EducationGroups.Add(new BookFilterItem { Id = j.ToString(), Count = 1 });
							else
								current.Count++;
						}
					if(item.TopicId != null) {
						var current = result.Categories.FirstOrDefault(x => x.Id == item.TopicId.ToString());
						if(current == null)
							result.Categories.Add(new BookFilterItem { Id = item.TopicId.Value.ToString(), Count = 1 });
						else
							current.Count++;
					}
					if(item.PublisherId != null) {
						var current = result.Publishers.FirstOrDefault(x => x.Id == item.PublisherId);
						if(current == null)
							result.Publishers.Add(new BookFilterItem { Id = item.PublisherId, Count = 1 });
						else
							current.Count++;
					}
					if(item.Year > 0) {
						var current = result.Years.FirstOrDefault(x => x.Id == item.Year.ToString());
						if(current == null)
							result.Years.Add(new BookFilterItem { Id = item.Year.ToString(), Count = 1 });
						else
							current.Count++;
					}
				}
				return result;
			}
			return null;
		}
	}
}
