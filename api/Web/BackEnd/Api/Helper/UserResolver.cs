using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.BackEnd.Api.Helper {
    public static class UserResolver {
        public static string GetUserId(this ControllerBase controller) {
            return controller.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
		public static bool IsDemoAcc(this ControllerBase controller) {
			return controller.User.FindFirstValue("demo") != null;
		}
		public static string GetUserName(this ControllerBase controller) {
            return controller.User.FindFirstValue(ClaimTypes.Name);
        }
		public static DateTime? GetUserAccountExpire(this ControllerBase controller) {
			string? expire = null;
			try {
				expire = controller.User.FindFirstValue("validuntil");
				return DateTime.ParseExact(expire, "dd.MM.yyyy", null);
			}
			catch {
				if(expire != null)
					return DateTime.Now;
			}
			return null;
		}
	}
}
