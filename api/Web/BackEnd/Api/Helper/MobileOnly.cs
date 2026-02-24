using DeviceDetectorNET;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Web.BackEnd.Api.Helper {
	public class MobileOnly : ActionFilterAttribute {
		public override void OnActionExecuting(ActionExecutingContext filterContext) {
			var agent = filterContext.HttpContext.Request.Headers.UserAgent;
			var dd = new DeviceDetector(agent);
			dd.SkipBotDetection();
			if(dd.IsBot() || !dd.IsMobile())
				filterContext.Result = new UnauthorizedResult();
		}
	}
}
