using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.BackEnd.Api.Helper {
    public static class GroupResolver {
        public static string? GetGroupId(this ControllerBase controller) {
            return controller.User.FindFirstValue("Group");
        }
    }
}
