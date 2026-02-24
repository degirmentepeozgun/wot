using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Web.BackEnd.Api.Helper {
    public static class EducationGroupResolver {
        public static short? GetEducationGroupId(this ControllerBase controller) {
            if(short.TryParse(controller.User.FindFirstValue("Edu"), out short s))
                return s;
            return null;
        }
    }
}
