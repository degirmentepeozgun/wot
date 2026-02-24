using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace Web.BackEnd.Api.Attribute {
	public class UserAuth : AuthorizeAttribute, IAuthorizationFilter {
		string[] notAllowedRoles = { "Refresh" };
		public void OnAuthorization(AuthorizationFilterContext context) {
			var claims = context.HttpContext.User.Claims;
			var roles = claims.Where(x => x.Type == ClaimTypes.Role);
			if(roles?.Any() ?? false) {
				int legalRolesCount = 0;
				foreach(var role in roles) {
					if(notAllowedRoles.Contains(role.Value)) {
						legalRolesCount = 0;
						break;
					}
					else
						legalRolesCount++;
				}
				if(legalRolesCount > 0)
					return;
			}
			context.Result = new ForbidResult();
		}
	}
}
