using Web.BackEnd.Api.Helper;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
	options.AddPolicy("GamePolicy", policy => {
		policy.SetIsOriginAllowed(_ => true)
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials();
	});
});
builder.Services.AddSignalR().AddMessagePackProtocol();

var app = builder.Build();
app.UseCors("GamePolicy");
app.MapHub<GameHub>("/gamehub");
app.Run();
