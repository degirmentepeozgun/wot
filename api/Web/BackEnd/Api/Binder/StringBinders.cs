using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;

namespace Web.BackEnd.Api.Binder {
	public class StringTrimBinder : IModelBinder {
		public Task BindModelAsync(ModelBindingContext bindingContext) {
			if(bindingContext is null)
				throw new ArgumentNullException(nameof(bindingContext));
			var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
			if(valueProviderResult == ValueProviderResult.None)
				return Task.CompletedTask;
			var str = valueProviderResult.FirstValue?.Trim();
			bindingContext.Result = ModelBindingResult.Success(string.IsNullOrEmpty(str) ? null : str);
			return Task.CompletedTask;
		}
	}
	public class GuidBinder : IModelBinder {
		public Task BindModelAsync(ModelBindingContext bindingContext) {
			if(bindingContext is null)
				throw new ArgumentNullException(nameof(bindingContext));
			var valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
			if(valueProviderResult == ValueProviderResult.None)
				return Task.CompletedTask;
			var str = valueProviderResult.FirstValue;
			bindingContext.Result = ModelBindingResult.Success((string.IsNullOrEmpty(str) || str == "0") ? null : str);
			return Task.CompletedTask;
		}
	}
	public class DisplayProvider : IDisplayMetadataProvider {
		public void CreateDisplayMetadata(DisplayMetadataProviderContext context) {
			if(context.Key.ModelType == typeof(string))
				context.DisplayMetadata.ConvertEmptyStringToNull = true;
		}
	}
}
