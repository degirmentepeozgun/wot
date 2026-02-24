using Api.Dto;
using Core.BusinessTemplates.Entity;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using Microsoft.AspNetCore.Mvc;
using Web.BackEnd.Business.Manager;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Business.Extension;

namespace Web.BackEnd.Api.Controllers {
	[ApiController]
	[Route("[controller]")]
	[Route("{language}/[controller]")]
	public class CompanyController {
		readonly CompanyManager Manager;
		readonly ILogger<CompanyController> Logger;
		public CompanyController(CompanyManager manager,
			ILogger<CompanyController> logger)
		{
			Manager = manager;
			Logger = logger;
		}

		[HttpGet("Get")]
		public async Task<HttpResult<List<CompanyDto>>?> Select(string? language) {
			List<FilterCondition> filters = new();
			filters.ExcludeHiddenRecords();
			HttpResult<List<CompanyDto>> result = new();
			try {
				var dbResult = await Manager.Filter(filters);
				List<Company>? companies = dbResult?.Data;
				if(companies?.Any() ?? false) {
					result.StatusCode = 200;
					result.Data = companies.Select(x => new CompanyDto {
						Id = x.Id,
						Name = x.Name + " (" + x.City + ")"
					}).ToList();
					result.TotalRecords = result.Data.Count;
				}
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
	}
}