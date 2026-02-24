
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using Web.BackEnd.Api.Binder;
using Web.BackEnd.Api.Helper;
using Web.BackEnd.Business.Manager;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOptions();
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.Configure<IpRateLimitPolicies>(builder.Configuration.GetSection("IpRateLimitPolicies"));
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
builder.Services.AddCors(options => {
	options.AddPolicy("K12Policy",
		builder => {
			builder.SetIsOriginAllowed((e) => {
				return true;
			})
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials();
		});
});
builder.Services.AddAuthentication(x => {
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x => {
	x.RequireHttpsMetadata = false;
	x.SaveToken = true;
	x.TokenValidationParameters = new TokenValidationParameters {
		ValidateIssuerSigningKey = true,
		ValidIssuer = builder.Configuration["JWTOptions:Issuer"],
		ValidAudience = builder.Configuration["JWTOptions:Issuer"],
		IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(builder.Configuration["JWTOptions:SecurityKey"])),
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ClockSkew = TimeSpan.Zero
	};
});
builder.Services.AddSingleton<SubManager>();
builder.Services.AddSingleton<SignalRManager>();
builder.Services.AddSingleton<MultiLangDataManager>();
builder.Services.AddSingleton<CategoryManager>();
builder.Services.AddSingleton<GameManager>();
builder.Services.AddSingleton<PublisherManager>();
builder.Services.AddSingleton<SubThemeManager>();
builder.Services.AddSingleton<TopicManager>();
builder.Services.AddSingleton<ThemeManager>();
builder.Services.AddSingleton<ContributorManager>();
builder.Services.AddSingleton<PackageManager>();
builder.Services.AddSingleton<PopularSearchManager>();
builder.Services.AddSingleton<PortalPackageBookManager>();
builder.Services.AddSingleton<ClientBookManager>();
builder.Services.AddSingleton<CustomerBookManager>();
builder.Services.AddSingleton<FavoriteManager>();
builder.Services.AddSingleton<CustomerManager>();
builder.Services.AddSingleton<BillAddressManager>();
builder.Services.AddSingleton<BookQuizAnswerManager>();
builder.Services.AddSingleton<BookQuizManager>();
builder.Services.AddSingleton<BookManager>();
builder.Services.AddSingleton<PortalPackageManager>();
builder.Services.AddSingleton<PackageCodeManager>();
builder.Services.AddSingleton<BasketItemManager>();
builder.Services.AddSingleton<BasketManager>();
builder.Services.AddSingleton<CompanyManager>();
builder.Services.AddSingleton<OfficerManager>();
builder.Services.AddSingleton<AccountGroupManager>();
builder.Services.AddSingleton<ClientManager>();
builder.Services.AddSingleton<FeedbackManager>();
builder.Services.AddSingleton<ContactManager>();
builder.Services.AddSingleton<PortalPackageOrderBookManager>();
builder.Services.AddSingleton<PortalPackageOrderManager>();
builder.Services.AddSingleton<DailyBadgeCountManager>();
builder.Services.AddSingleton<PublisherReadsByMonthManager>();
builder.Services.AddSingleton<TotalPublisherReadsByMonthManager>();
builder.Services.AddSingleton<CountryManager>();
builder.Services.AddSingleton<CityManager>();
builder.Services.AddSingleton<CountyManager>();
builder.Services.AddSingleton<BankBinManager>();
builder.Services.AddSingleton<ProductPriceManager>();
builder.Services.AddSingleton<ProductManager>();
builder.Services.AddSingleton<WithdrawDetailManager>();
builder.Services.AddSingleton<WithdrawAddressManager>();
builder.Services.AddSingleton<WithdrawManager>();
builder.Services.AddSingleton<FeedManager>();
builder.Services.AddSingleton<MissionSessionManager>();
builder.Services.AddSingleton<LeaderBoardsManager>();
builder.Services.AddSingleton<GameHub>();
builder.Services.AddControllers(opt => {
	opt.ModelBinderProviders.Insert(0, new CustomModelBinderProvider());
}).AddJsonOptions(opt => {
	opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
	opt.JsonSerializerOptions.Converters.Add(new GuidJsonConverter());
	opt.JsonSerializerOptions.Converters.Add(new StringConverters());
}).AddMvcOptions(opt => {
	opt.ModelMetadataDetailsProviders.Add(new DisplayProvider());
	//opt.ModelMetadataDetailsProviders.Add(new CaseProvider());
});
builder.Services.Configure<ForwardedHeadersOptions>(options => {
	options.ForwardedHeaders =
		ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
});
builder.Services.AddSignalR().AddMessagePackProtocol();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if(app.Environment.IsDevelopment()) {
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseIpRateLimiting();
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("K12Policy");
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints => {
	endpoints.MapHub<GameHub>("/gamehub");
	endpoints.MapControllers();
	endpoints.MapControllerRoute(
		name: "default",
		pattern: "{controller=Communication}/{action=Index}/{id?}"
	);
});
IIpPolicyStore IpPolicy = app.Services.GetRequiredService<IIpPolicyStore>();
await IpPolicy.SeedAsync();
app.Run();
