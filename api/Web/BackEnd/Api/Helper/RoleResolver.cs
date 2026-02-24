using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.BackEnd.Api.Helper {
    public static class RoleResolver {
        public static string[] GetRoles(this ControllerBase controller) {
            return controller.User.FindAll(ClaimTypes.Role).
                Select(x => x.ToString()).ToArray();
        }
    }
}
