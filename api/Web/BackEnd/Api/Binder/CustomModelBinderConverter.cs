using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Web.BackEnd.Api.Binder {
	public class CustomModelBinderProvider : IModelBinderProvider {
		public IModelBinder? GetBinder(ModelBinderProviderContext context) {
			if(context != null) {
				if(context.Metadata.ModelType == typeof(string))
					//{
					//	var attribute = context.Metadata.ModelType.GetCustomAttributes(true)?.FirstOrDefault(x => x.GetType() == typeof(TitleCaseAttribute));
					//	if(attribute != null) {
					//		var ttAttr = (TitleCaseAttribute)attribute;
					//		return new StringTitleCaseBinder(ttAttr.AllowedSymbols);
					//	}
					return new StringTrimBinder();
				//}
				else if(context.Metadata.ModelType == typeof(Guid?))
					return new GuidBinder();
			}
			return null;
		}
	}
}
