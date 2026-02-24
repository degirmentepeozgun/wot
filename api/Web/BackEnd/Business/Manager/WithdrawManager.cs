using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.BusinessTemplates.Statics;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.Logging;
using System.Globalization;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Xml;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Business.Helper;
using Web.BackEnd.Entity.Concrete;
using Web.BackEnd.Entity.Dto;

namespace Web.BackEnd.Business.Manager {
	public class WithdrawManager : BusinessBase<Withdraw, string?> {
		const string _filterName = "Source", _filterValue = "kitap12";
		readonly static Encoding iso = Encoding.GetEncoding("ISO-8859-9");
		const string _url3D = "https://sanalposprovtest.garantibbva.com.tr/servlet/gt3dengine",
			_url = "https://sanalposprovtest.garantibbva.com.tr/VPServlet",
			_realUrl3D = "https://sanalposprov.garanti.com.tr/servlet/gt3dengine",
			_responseUrl = "https://webapi.kitap12.com/garantiresponse/test",
			_realresponseUrl = "https://webapi.kitap12.com/garantiresponse/real",
			_merchantId = "7000679", _realMerchantId = "1153885",
			_provUserId = "PROVAUT", _terminalUserId = "GARANTI",
			_provisionPassword = "123qweASD/", _realProvisionPassword = "Fkrmgh0240.5kskqw",
			_terminalId = "30691297", _realTerminalId = "10204575",
			_storeKey = "12345678", _realStoreKey = "47726b676d343430676b64456d616b666c676430666c3165",
			_companyName = "GARANTI TEST", _realCompanyName = "Kitap12";
		readonly CustomerManager CustomerManager;
		readonly ProductManager ProductManager;
		readonly BillAddressManager BillAddressManager;
		readonly WithdrawAddressManager WithdrawAddressManager;
		readonly WithdrawDetailManager WithdrawDetailManager;
		readonly BankBinManager BankBinManager;
		readonly CountryManager CountryManager;
		readonly CityManager CityManager;
		readonly CountyManager CountyManager;
		public WithdrawManager(CustomerManager customerManager,
			ProductManager productManager,
			BillAddressManager billAddressManager,
			WithdrawAddressManager withdrawAddressManager,
			WithdrawDetailManager withdrawDetailManager,
			BankBinManager bankBinManager,
			CountryManager countryManager,
			CityManager cityManager,
			CountyManager countyManager) {
			CustomerManager = customerManager;
			ProductManager = productManager;
			BillAddressManager = billAddressManager;
			WithdrawAddressManager = withdrawAddressManager;
			WithdrawDetailManager = withdrawDetailManager;
			BankBinManager = bankBinManager;
			CountryManager = countryManager;
			CityManager = cityManager;
			CountyManager = countyManager;
			DatabaseName = "Sales";
			Schema = "public";
		}
		public static string GetTestStoreKey() {
			return _storeKey;
		}
		public static string GetRealStoreKey() {
			return _realStoreKey;
		}
		public static string Sha1ThreeD(string text) {
			var provider = CodePagesEncodingProvider.Instance;
			Encoding.RegisterProvider(provider);
			var cryptoServiceProvider = new SHA1CryptoServiceProvider();
			var inputbytes = cryptoServiceProvider.ComputeHash(iso.GetBytes(text));
			var builder = new StringBuilder();
			for(int i = 0; i < inputbytes.Length; i++)
				builder.Append(string.Format("{0,2:x}", inputbytes[i]).Replace(" ", "0"));
			return builder.ToString().ToUpper();
		}
		public static string Sha512ThreeD(string text) {
			var provider = CodePagesEncodingProvider.Instance;
			Encoding.RegisterProvider(provider);
			var cryptoServiceProvider = new SHA512CryptoServiceProvider();
			var inputbytes = cryptoServiceProvider.ComputeHash(iso.GetBytes(text));
			var builder = new StringBuilder();
			for(int i = 0; i < inputbytes.Length; i++)
				builder.Append(string.Format("{0,2:x}", inputbytes[i]).Replace(" ", "0"));
			return builder.ToString().ToUpper();
		}
		public static string GetHashDataThreeD(string provisionPassword, string terminalId, string orderId, ulong amount, int currencyCode, int installmentCount, string storeKey, string successUrl, string type,string errorUrl) {
			var hashedPassword = Sha1ThreeD(provisionPassword + "0" + terminalId);
			return Sha512ThreeD(terminalId + orderId + amount + currencyCode + successUrl + 
				errorUrl + type + installmentCount + storeKey + hashedPassword).ToUpper();
		}
		public static string Sha1(string text) {
			var provider = CodePagesEncodingProvider.Instance;
			Encoding.RegisterProvider(provider);

			var cryptoServiceProvider = new SHA1CryptoServiceProvider();
			var inputbytes = cryptoServiceProvider.ComputeHash(Encoding.GetEncoding("ISO-8859-9").GetBytes(text));

			var builder = new StringBuilder();
			for(int i = 0; i < inputbytes.Length; i++) {
				builder.Append(string.Format("{0,2:x}", inputbytes[i]).Replace(" ", "0"));
			}

			return builder.ToString().ToUpper();
		}

		public static string Sha512(string text) {
			var provider = CodePagesEncodingProvider.Instance;
			Encoding.RegisterProvider(provider);

			var cryptoServiceProvider = new SHA512CryptoServiceProvider();
			var inputbytes = cryptoServiceProvider.ComputeHash(Encoding.GetEncoding("ISO-8859-9").GetBytes(text));

			var builder = new StringBuilder();
			for(int i = 0; i < inputbytes.Length; i++) {
				builder.Append(string.Format("{0,2:x}", inputbytes[i]).Replace(" ", "0"));
			}

			return builder.ToString().ToUpper();
		}

		public static string GetHashData(string userPassword, string terminalId, string orderId, string cardNumber, ulong amount, int currencyCode) {
			var hashedPassword = Sha1(userPassword + "0" + terminalId);
			return Sha512(orderId + terminalId + cardNumber + amount + currencyCode + hashedPassword).ToUpper();
		}

		//public async Task<string?> Pay3D(PaymentDto props, string ip, string userid) {
		//	return null;
		//}
		public async Task<Withdraw?> CheckStatus(string orderId) {
			return await base.Get(orderId);
		}
		public async Task<string> GetOrderSuccessEmailBody(OrderDto dto) {
			var country = await CountryManager.Get(dto.Address.Country);
			var city = await CityManager.Get(Convert.ToInt32(dto.Address.City));
			var county = await CountyManager.Get(Convert.ToInt32(dto.Address.County));
			var body = @"<div style=""margin:2% auto 0 auto;padding: 12px; box-sizing: border-box; max-width: 648px"">
				<div style=""text-align:center"">
					<div style=""display:flex;flex-wrap:nowrap;justify-content:center;align-items:center"">
						<div style=""font-size:large;display:flex;flex-wrap:nowrap;justify-content:center;align-items:center"">
							<img style=""filter:drop-shadow(0px 0px 1px #00000080);-webkit-filter:drop-shadow(0px 0px 1px #00000080);height:30px;margin:0 8px"" src=""https://www.kitap12.com/assets/images/order-done.png"" />
							Siparişiniz Onaylandı
						</div>
					</div>
				</div>
				<div style=""margin-top:32px; padding: 24px; box-sizing: border-box; width: 100%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"">
				<div style=""padding:2px 0"">Sipariş Numaranız: <b>" + dto.Order.Id + @"</b></div>
				<div style=""font-weight:600;font-size:large;padding:16px 0 8px 0"">Fatura Adresiniz</div>
				<div>
				<div>
				<div style=""padding:2px 4px"">" + dto.Address.Title + " - " + dto.Address.Name + (dto.Address.TaxOffice?.Length > 0 ? "(Kurumsal)" : "(Bireysel)") + @"</div>
				<div style=""padding:2px 4px"">" + dto.Address.Address + @"</div>
				<div style=""padding:2px 4px"">" + county.Name + " / " + city.Name + "&nbsp;(" + country.Name + @")</div></div></div>
				<div style=""font-weight:600;font-size:large;padding:16px 0 8px 0"">Siparişinize Ait Ürünler</div>";
			foreach(var product in dto.Details)
				body += @"<div style=""display:flex;flex-wrap:nowrap;width:100%;align-items:center;-webkit-align-items:center;justify-content:space-between;-webkit-justify-content:space-between;padding:4px;padding-top:8px""><div>" + product.ProductName + "</div><div>İndirim: " + (product.DiscountAmount == 0 ? '-' : ("<span style='color:red'>-" + product.DiscountAmount + " TL</span>")) + @"</div></div>
					<div style=""display:flex;flex-wrap:nowrap;width:100%;align-items:center;-webkit-align-items:center;justify-content:space-between;-webkit-justify-content:space-between;padding:4px;border-bottom:1px solid #00000040""><div>Geçerlilik Süresi: " + product.ExpireDateTime.ToString(Variables.DateTimePattern) + "</div><div>Ürün Tutarı: " + (product.DiscountAmount > 0 ? "<span style='text-decoration:line-through'>" + product.TotalAmount + " TL</span> " + product.FinalAmount + " TL" : product.FinalAmount + " TL") + "</div></div>";
			body += "<div style=\"text-align:right;padding:16px 0 4px 0\">Kullanılan Banka: <img style=\"margin-left:4px;height:28px\" src='https://www.kitap12.com/assets/images/bank/" + dto.Order.BankNo.ToString().PadLeft(4, '0') + "/icon.png' /></div>";
			if(dto.Order.CouponDiscountAmount > 0) {
				body += "<div style=\"text-align:right;padding:4px 0\">Kupon Kodu: #" + dto.Order.CouponCode + "</div>";
				body += "<div style=\"text-align:right;padding:4px 0\">Kupon İndirimi: <span style=\"color:red\">-" + dto.Order.CouponDiscountAmount + " TL</span></div>";
			}
			body += "<div style=\"text-align:right;padding:4px 0\">Alınan Toplam İndirim: " + (dto.Order.TotalDiscount == 0 ? '-' : "<span style=\"color:red\">-" + dto.Order.TotalDiscount + " TL</span>") + "</div>";
			body += "<div style=\"text-align:right;padding:4px 0\">Ödenen Toplam Tutar: " + (dto.Order.TotalDiscount > 0 ? ("<span style=\"text-decoration:line-through\">" + dto.Order.TotalAmount + "</span>&nbsp;") : "") + dto.Order.FinalAmount + " TL" + "</div>";
			return body + @"</div>
				<div style=""padding:32px 0 24px 0;text-align:center"">
					<div>
						Aboneliğinizi kullanmaya şu andan itibaren başlayabilirsiniz. <br/>Abonelik erişiminiz için mobil uygulamamızı indirmeniz ve cihazınıza yüklemeniz gerekmektedir.
						Detaylı bilgi almak için <a style=""color:#006aa2"" target=""_blank"" href=""https://www.kitap12.com/customer/"">sayfamızı</a> ziyaret edebilirsiniz
					</div>
					<div>Sipariş detayınıza ulaşmak için <a style=""color:#006aa2"" target=""_blank"" href=""https://www.kitap12.com/customer/"">siparişlerim</a> sayfamızı ziyaret edebilirsiniz</div>
				</div></div>";
		}
		public async Task<OrderDto?> Pay3DTEST(PaymentDto props, string ip, string userid) {
			string orderId = Guid.NewGuid().ToString("N");
			orderId = "K12-" + orderId.Substring(0, orderId.Length - 20).ToUpper();
			Database? db = null;
			List<Product>? products = null;
			Customer? customer;
			Withdraw? order;
			WithdrawAddress? wdAddress;
			List<WithdrawDetail>? details = null;
			string threeDForm = "";
			try {
				customer = await CustomerManager.Get(userid);
				if(customer == null)
					throw new MyException("Geçersiz Kullanıcı");
				//props.Email = customer.Email;
				ip = "192.168.0.1";
				props.CardNumber = props.CardNumber.Replace(" ", string.Empty);
				customer = await CustomerManager.Get(userid);
				if(customer == null)
					throw new MyException("Kullanıcı Bulunamadı");
				var address = await BillAddressManager.Get(props.BillAddressId);
				if(address == null)
					throw new MyException("Fatura Adresi Bilgisi Bulunamadı");
				var productIds = props.ProductIds.Split(',', StringSplitOptions.RemoveEmptyEntries);
				List<string> ProductIds = new();
				List<int> ProductMonths = new();
				foreach(var item in productIds) {
					ProductIds.Add(item.Split('-')[0]);
					ProductMonths.Add(Convert.ToInt32(item.Split('-')[1]));
				}
				var productLength = productIds?.Length ?? 0;
				if(productLength > 0) {
					var productFilters = ProductIds.Select(x =>
						new FilterCondition {
							ColumnName = "ProductId",
							Value = x.Trim()
						}).ToList();
					productFilters.AddOnly(new FilterCondition {
						ColumnName = _filterName,
						Value = _filterValue
					});
					productFilters.ExcludeHiddenRecords();
					products = (await ProductManager.Filter(productFilters))?.Data;
					if(products?.Count != productLength)
						throw new MyException("Seçilen Ürün/Ürünler Geçersiz");
					//var totalAmount = products.Sum(x => x.Amount);
					decimal totalAmount = 0;
					int i = 0;
					foreach(var item in products) {
						totalAmount += item.Prices?.FirstOrDefault(x => x.MonthCount == ProductMonths[i])?.DiscountedAmount ?? 0;
						i++;
					}
					if(totalAmount != Convert.ToDecimal(props.Amount))
						throw new MyException("Ödenecek Tutar Geçersiz");
				}
				else
					throw new MyException("Ürün Seçimi Geçersiz");
				Withdraw w = new() {
					CustomerId = userid,
					TotalDiscount = 0,
					DiscountAmount = 0,
					CouponDiscountAmount = 0,
					TotalAmount = Convert.ToDecimal(props.Amount),
					ExpireDateTime = DateTime.Today.AddDays(1).AddYears(1),
					CarryingCharge = 0,
					Email = customer.Email,
					Installment = 0,
					Phone = customer.Phone,
					Source = _filterValue,
					Id = orderId,
					Flags = 1,
					CreditCardBin = props.CardNumber.Substring(0, 6),
				};
				var bankCode = (await BankBinManager.Filter(new List<FilterCondition> {
					new FilterCondition{
						ColumnName = "Bin",
						Value = w.CreditCardBin
					}
				}, 1, 1))?.Data?.FirstOrDefault()?.Id;
				if(short.TryParse(bankCode, out var bankCodeValue))
					w.BankNo = bankCodeValue;
				else
					throw new MyException("Kredi kartının ait olduğu banka geçersiz");
				w.FinalAmount = w.TotalAmount;
				db = new(true, this.DatabaseName, this.Schema);
				order = await base.Edit(w, null, db, true);
				if(order == null)
					throw new MyException("Sipariş alınamadı");
				WithdrawAddress withdrawAddress = new() {
					WithdrawId = order.Id,
					Name = address.Name,
					Address = address.Address,
					Title = address.Title,
					CitizenNo = address.CitizenNo,
					TaxNumber = address.TaxNumber,
					TaxOffice = address.TaxOffice,
					City = address.City,
					Country = address.Country,
					County = address.County
				};
				wdAddress = await WithdrawAddressManager.Edit(withdrawAddress, null, db, true);

				if(products?.Any() ?? false) {
					var wDetails = new List<WithdrawDetail>();
					for(int i = 0; i < products.Count; i++) {
						var productId = ProductIds[i];
						var product = products.FirstOrDefault(p => p.ProductId == productId);
						wDetails.Add(new WithdrawDetail {
							CustomerId = order.CustomerId,
							ExpireDateTime = DateTime.Today.AddDays(1).AddMonths(ProductMonths[i]),
							WithdrawId = w.Id,
							ProductId = productId,
							TotalAmount = product.Prices.FirstOrDefault(x => x.MonthCount == ProductMonths[i]).Amount,
							DiscountAmount = product.Prices.FirstOrDefault(x => x.MonthCount == ProductMonths[i]).Discount,
							ProductName = product.Name
						});
					}
					details = await WithdrawDetailManager.EditMany(wDetails, null, db);
				}
				await db.EndTransaction();


				//props.CardNumber = props.CardNumber.Replace(" ", string.Empty);
				string cardExpire = props.CardExpire.Replace("/", string.Empty);
				var hashedPassword = GVPOSHelper.Sha1(
					_provisionPassword //provision password
					+
					_terminalId.PadLeft(9, '0') //terminal id
				);
				string amount = Convert.ToUInt64(props.Amount * 100).ToString();
				string testhash = GVPOSHelper.Sha512(
					_terminalId + //terminalid TOPLAM 9 HANE solda 0 ile tamamlanmış
					orderId + //orderid KENDİ TEST DOKÜMANINDAN ALDIM
					amount + //amount KENDİ TEST DOKÜMANINDAN ALDIM
					949 + //currency TL
					_responseUrl + //successurl AKTİF URL
					_responseUrl + //errorurl AKTİF URL
					"sales" + // tip KENDİ TEST DOKÜMANINDA YAZAN PEŞİN ÖDEME TİPİ
					"0" + // taksit tutarı yok PEŞİN ÖDEME
					_storeKey + //store key test
					hashedPassword);
				string source = "mode=TEST" +
					"&apiversion=512" +
					"&secure3dsecuritylevel=3D_PAY" +
					"&terminalprovuserid=PROVAUT" +
					"&terminaluserid=GARANTI" +
					"&terminalmerchantid=" + _merchantId +
					"&terminalid=" + _terminalId +
					"&orderid=" + orderId +
					"&successurl=https%3A%2F%2Fwebapi.kitap12.com%2Fgarantiresponse%2Fsuccess" +
					"&errorurl=https%3A%2F%2Fwebapi.kitap12.com%2Fgarantiresponse%2Ffail" +
					"&customeremailaddress=eticaret%40garanti.com.tr" +
					"&customeripaddress=192.168.0.1" +
					"&companyname=GARANTI+TEST" +
					"&lang=tr" +
					"&txntimestamp=2023-04-30T11%3A31%3A53Z&" +
					"refreshtime=1" +
					"&secure3dhash=" + testhash +
					"&txnamount=" + amount +
					"&txntype=sales" +
					"&txncurrencycode=949" +
					"&txninstallmentcount=0" +
					"&cardholdername=" + props.CardHolderName +
					"&cardnumber=" + props.CardNumber +
					"&cardexpiredatemonth=" + props.CardExpire.Split('/')[0] +
					"&cardexpiredateyear=" + props.CardExpire.Split('/')[1] +
					"&cardcvv2=" + props.CardCVV2;
				//string strPost = "mode=TEST" +
				//			"&apiversion=512" +
				//			"&secure3dsecuritylevel=3D_PAY" +
				//			"&terminalprovuserid=PROVAUT" +
				//			"&terminaluserid=" + _terminalUserId +
				//			"&terminalmerchantid=" + _merchantId +
				//			"&terminalid=" + _terminalId +
				//			"&orderid=" + orderId +
				//			"&successurl=" + _successUrl +
				//			"&errorurl=" + _failUrl +
				//			"&customeremailaddress=" + props.Email +
				//			"&customeripaddress=" + ip +
				//			"&companyname=" + _companyName +
				//			"&lang=tr" +
				//			"&txntimestamp=" + DateTime.UtcNow.ToString().Replace(' ', 'T') +
				//			"&refreshtime=1" +
				//			"&secure3dhash=" + testhash +
				//			"&txnamount=" + amount +
				//			"&txntype=sales" +
				//			"&txncurrencycode=949" +
				//			"&txninstallmentcount=" +
				//			"&cardholdername=" + props.CardHolderName +
				//			"&cardnumber=" + props.CardNumber +
				//			"&cardexpiredatemonth=" + props.CardExpire.Split('/')[0] +
				//			"&cardexpiredateyear=" + props.CardExpire.Split('/')[1] +
				//			"&cardcvv2=" + props.CardCVV2;
				Dictionary<string, string> strPost = new() {
					{ "mode","TEST" },
					{"apiversion","512" },
					{"secure3dsecuritylevel","3D_PAY" },
					{"terminalprovuserid","PROVAUT" },
					{"terminaluserid", _terminalUserId },
					{"terminalmerchantid", _merchantId },
					{"terminalid", _terminalId },
					{"orderid", orderId },
					{"successurl", _responseUrl },
					{"errorurl", _responseUrl },
					{"customeremailaddress", customer.Email },
					{"customeripaddress", ip },
					{"companyname", _companyName },
					{"lang","tr" },
					{"txntimestamp", DateTime.UtcNow.ToString().Replace(' ', 'T') },
					{"refreshtime","1" },
					{"secure3dhash", testhash },
					{"txnamount", amount },
					{"txntype", "sales" },
					{"txncurrencycode", "949" },
					{"txninstallmentcount", "0" },
					{"cardholdername", props.CardHolderName },
					{"cardnumber", props.CardNumber },
					{"cardexpiredatemonth", props.CardExpire.Split('/')[0] },
					{"cardexpiredateyear", props.CardExpire.Split('/')[1] },
					{"cardcvv2", props.CardCVV2 }
			};
				using HttpContent formContent = new FormUrlEncodedContent(strPost);
				HttpClient client = new();
				using(HttpResponseMessage response = await client.PostAsync(_url3D, formContent).ConfigureAwait(false)) {
					response.EnsureSuccessStatusCode();
					threeDForm = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
				}
			}
			catch(MyException mex) {
				if(db != null)
					await db.EndTransaction(false);
				throw mex;
			}
			catch(Exception ex) {
				if(db != null)
					await db.EndTransaction(false);
				throw;
			}
			return new OrderDto {
				Order = order,
				Customer = customer,
				Address = wdAddress,
				Details = details,
				ThreeDForm = threeDForm
			};
		}

		public async Task<short> GetOrderStatus(string orderid, string customerid) {
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "CustomerId",
				Value = customerid
			});
			filters.Add(new FilterCondition {
				ColumnName = "Id",
				Value = orderid
			});
			var order = (await base.Filter(filters, 1, 1))?.Data?.FirstOrDefault();
			return order?.Flags ?? 0;
		} 

		public async Task<OrderDto?> Pay3D(PaymentDto props, string ip, string userid, string? lang = null) {
			string orderId = Guid.NewGuid().ToString("N");
			orderId = "K12-" + orderId.Substring(0, orderId.Length - 20).ToUpper();
			Database? db = null;
			List<Product>? products = null;
			Customer? customer;
			Withdraw? order;
			WithdrawAddress? wdAddress;
			List<WithdrawDetail>? details = null;
			string threeDForm = "";
			try {
				customer = await CustomerManager.Get(userid);
				if(customer == null)
					throw new MyException("Geçersiz Kullanıcı");
				var productIds = props.ProductIds.Split(',', StringSplitOptions.RemoveEmptyEntries);
				Database dbw = new("Sales", "public");
				dbw.AddParameter(userid);
				var withdraws = (await dbw.Execute<List<CustomerWithdrawDetailDto>>("customerwithdrawdetails"));
				if(withdraws?.Any() ?? false)
					foreach(var withdraw in withdraws)
						foreach(var productId in productIds)
							if(withdraw.ProductId == productId && withdraw.ExpireDateTime > DateTime.Now)
								throw new MyException("Almakta olduğunuz ürünlerden biri için aboneliğiniz devam etmektedir. Lütfen kontrol ediniz.");
				if((ip?.Length ?? 0) < 7)
					ip = "85.104.114.83"; //"127.0.0.1";
				props.CardNumber = props.CardNumber.Replace(" ", string.Empty);
				var address = await BillAddressManager.Get(props.BillAddressId);
				if(address == null)
					throw new MyException("Fatura Adresi Bilgisi Bulunamadı");
				List<string> ProductIds = new();
				List<int> ProductMonths = new();
				foreach(var item in productIds) {
					ProductIds.Add(item.Split('-')[0]);
					ProductMonths.Add(Convert.ToInt32(item.Split('-')[1]));
				}
				var productLength = productIds?.Length ?? 0;
				if(productLength > 0) {
					var productFilters = ProductIds.Select(x =>
						new FilterCondition {
							ColumnName = "ProductId",
							Value = x.Trim()
						}).ToList();
					productFilters.AddOnly(new FilterCondition {
						ColumnName = _filterName,
						Value = _filterValue
					});
					productFilters.ExcludeHiddenRecords();
					products = (await ProductManager.Filter(productFilters))?.Data;
					if(products?.Count != productLength)
						throw new MyException("Seçilen Ürün/Ürünler Geçersiz");
					//var totalAmount = products.Sum(x => x.Amount);
					decimal totalAmount = 0;
					int i = 0;
					foreach(var item in products) {
						totalAmount += item.Prices?.FirstOrDefault(x => x.MonthCount == ProductMonths[i])?.DiscountedAmount ?? 0;
						i++;
					}
					if(totalAmount != Convert.ToDecimal(props.Amount))
						throw new MyException("Ödenecek Tutar Geçersiz");
				}
				else
					throw new MyException("Ürün Seçimi Geçersiz");
				Withdraw w = new() {
					CustomerId = userid,
					TotalDiscount = 0,
					DiscountAmount = 0,
					CouponDiscountAmount = 0,
					TotalAmount = Convert.ToDecimal(props.Amount),
					ExpireDateTime = DateTime.Today.AddDays(1).AddYears(1),
					CarryingCharge = 0,
					Email = customer.Email,
					Installment = 0,
					Language = lang ?? "tr",
					Phone = customer.Phone,
					Source = _filterValue,
					Id = orderId,
					Flags = 1,
					CreditCardBin = props.CardNumber.Substring(0, 6),
				};
				var bankCode = (await BankBinManager.Filter(new List<FilterCondition> {
					new FilterCondition{
						ColumnName = "Bin",
						Value = w.CreditCardBin
					}
				}, 1, 1))?.Data?.FirstOrDefault()?.Id;
				if(short.TryParse(bankCode, out var bankCodeValue))
					w.BankNo = bankCodeValue;
				else
					throw new MyException("Kredi kartının ait olduğu banka geçersiz");
				w.FinalAmount = w.TotalAmount;
				db = new(true, this.DatabaseName, this.Schema);
				order = await base.Edit(w, null, db, true);
				if(order == null)
					throw new MyException("Sipariş alınamadı");
				WithdrawAddress withdrawAddress = new() {
					WithdrawId = order.Id,
					Name = address.Name,
					Address = address.Address,
					Title = address.Title,
					CitizenNo = address.CitizenNo,
					TaxNumber = address.TaxNumber,
					TaxOffice = address.TaxOffice,
					City = address.City,
					Country = address.Country,
					County = address.County
				};
				wdAddress = await WithdrawAddressManager.Edit(withdrawAddress, null, db, true);

				if(products?.Any() ?? false) {
					var wDetails = new List<WithdrawDetail>();
					for(int i = 0; i < products.Count; i++) {
						var productId = ProductIds[i];
						var product = products.FirstOrDefault(p => p.ProductId == productId);
						wDetails.Add(new WithdrawDetail {
							CustomerId = order.CustomerId,
							ExpireDateTime = DateTime.Today.AddDays(1).AddMonths(ProductMonths[i]),
							WithdrawId = w.Id,
							ProductId = productId,
							TotalAmount = product.Prices.FirstOrDefault(x => x.MonthCount == ProductMonths[i]).Amount,
							DiscountAmount = product.Prices.FirstOrDefault(x => x.MonthCount == ProductMonths[i]).Discount,
							ProductName = product.Name
						});
					}
					details = await WithdrawDetailManager.EditMany(wDetails, null, db);
				}
				await db.EndTransaction();

				string cardExpire = props.CardExpire.Replace("/", string.Empty);
				var hashedPassword = GVPOSHelper.Sha1(
					_realProvisionPassword //provision password
					+
					_realTerminalId.PadLeft(9, '0') //terminal id
				);
				string amount = Convert.ToUInt64(props.Amount * 100).ToString();
				string testhash = GVPOSHelper.Sha512(
					_realTerminalId + //terminalid TOPLAM 9 HANE solda 0 ile tamamlanmış
					orderId + //orderid KENDİ TEST DOKÜMANINDAN ALDIM
					amount + //amount KENDİ TEST DOKÜMANINDAN ALDIM
					949 + //currency TL
					_realresponseUrl + //successurl AKTİF URL
					_realresponseUrl + //errorurl AKTİF URL
					"sales" + // tip KENDİ TEST DOKÜMANINDA YAZAN PEŞİN ÖDEME TİPİ
					"0" + // taksit tutarı yok PEŞİN ÖDEME
					_realStoreKey + //store key test
					hashedPassword);
				Dictionary<string, string> strPost = new() {
					{ "mode","PROD" },
					{"apiversion","512" },
					{"secure3dsecuritylevel","3D_PAY" },
					{"terminalprovuserid","PROVAUT" },
					{"terminaluserid", _terminalUserId },
					{"terminalmerchantid", _realMerchantId },
					{"terminalid", _realTerminalId },
					{"orderid", orderId },
					{"successurl", _realresponseUrl },
					{"errorurl", _realresponseUrl },
					{"customeremailaddress", customer.Email },
					{"customeripaddress", ip },
					{"companyname", _realCompanyName },
					{"lang", lang ?? "tr" },
					{"txntimestamp", DateTime.UtcNow.ToString().Replace(' ', 'T') },
					{"refreshtime","1" },
					{"secure3dhash", testhash },
					{"txnamount", amount },
					{"txntype", "sales" },
					{"txncurrencycode", "949" },
					{"txninstallmentcount", "0" },
					{"cardholdername", props.CardHolderName },
					{"cardnumber", props.CardNumber },
					{"cardexpiredatemonth", props.CardExpire.Split('/')[0] },
					{"cardexpiredateyear", props.CardExpire.Split('/')[1] },
					{"cardcvv2", props.CardCVV2 }
			};
				using HttpContent formContent = new FormUrlEncodedContent(strPost);
				HttpClient client = new();
				using HttpResponseMessage response = await client.PostAsync(_realUrl3D, formContent).ConfigureAwait(false);
				response.EnsureSuccessStatusCode();
				threeDForm = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
			}
			catch(MyException mex) {
				if(db != null)
					await db.EndTransaction(false);
				throw mex;
			}
			catch(Exception ex) {
				if(db != null)
					await db.EndTransaction(false);
				throw;
			}
			return new OrderDto {
				Order = order,
				Customer = customer,
				Address = wdAddress,
				Details = details,
				ThreeDForm = threeDForm
			};
		}
		public async Task<OrderDto?> Pay(PaymentDto props, string ip, string userid) {
			Database? db = null;
			string? orderId = null;
			List<Product>? products = null;
			Customer? customer;
			Withdraw? order;
			WithdrawAddress? wdAddress;
			List<WithdrawDetail>? details = null;
			try {
				if((ip?.Length ?? 0) < 7)
					ip = "127.0.0.1";
				props.CardNumber = props.CardNumber.Replace(" ", string.Empty);
				customer = await CustomerManager.Get(userid);
				if(customer == null)
					throw new MyException("Kullanıcı Bulunamadı");
				var address = await BillAddressManager.Get(props.BillAddressId);
				if(address == null)
					throw new MyException("Fatura Adresi Bilgisi Bulunamadı");
				var productIds = props.ProductIds.Split(',', StringSplitOptions.RemoveEmptyEntries);
				List<string> ProductIds = new();
				List<int> ProductMonths = new();
				foreach(var item in productIds) {
					ProductIds.Add(item.Split('-')[0]);
					ProductMonths.Add(Convert.ToInt32(item.Split('-')[1]));
				}
				var productLength = productIds?.Length ?? 0;
				if(productLength > 0) {
					var productFilters = ProductIds.Select(x =>
						new FilterCondition {
							ColumnName = "ProductId",
							Value = x.Trim()
						}).ToList();
					productFilters.AddOnly(new FilterCondition {
						ColumnName = _filterName,
						Value = _filterValue
					});
					productFilters.ExcludeHiddenRecords();
					products = (await ProductManager.Filter(productFilters))?.Data;
					if(products?.Count != productLength)
						throw new MyException("Seçilen Ürün/Ürünler Geçersiz");
					//var totalAmount = products.Sum(x => x.Amount);
					decimal totalAmount = 0;
					int i = 0;
					foreach(var item in products) {
						totalAmount += item.Prices?.FirstOrDefault(x => x.MonthCount == ProductMonths[i])?.DiscountedAmount ?? 0;
						i++;
					}
					if(totalAmount != Convert.ToDecimal(props.Amount))
						throw new MyException("Ödenecek Tutar Geçersiz");

				}
				else
					throw new MyException("Ürün Seçimi Geçersiz");
				orderId = "K12-" + Guid.NewGuid().ToString().Replace("-", string.Empty).ToUpper().Substring(0, 10);
				Withdraw w = new() {
					CustomerId = userid,
					TotalDiscount = 0,
					DiscountAmount = 0,
					CouponDiscountAmount = 0,
					TotalAmount = Convert.ToDecimal(props.Amount),
					ExpireDateTime = DateTime.Today.AddDays(1).AddYears(1),
					CarryingCharge = 0,
					Email  = customer.Email,
					Installment = 0,
					Phone = customer.Phone,
					Source = _filterValue,
					Id = orderId,
					Flags = 1,
					CreditCardBin = props.CardNumber.Substring(0, 6),
				};
				var bankCode = (await BankBinManager.Filter(new List<FilterCondition> {
					new FilterCondition{
						ColumnName = "Bin",
						Value = w.CreditCardBin
					}
				}, 1, 1))?.Data?.FirstOrDefault()?.Id;
				if(short.TryParse(bankCode, out var bankCodeValue))
					w.BankNo = bankCodeValue;
				else
					throw new MyException("Kredi kartının ait olduğu banka geçersiz");
				w.FinalAmount = w.TotalAmount;
				db = new(true, this.DatabaseName, this.Schema);
				order = await base.Edit(w, null, db, true);
				if(order == null)
					throw new MyException("Sipariş alınamadı");
				WithdrawAddress withdrawAddress = new() {
					WithdrawId = order.Id,
					Name = address.Name,
					Address = address.Address,
					Title = address.Title,
					CitizenNo = address.CitizenNo,
					TaxNumber = address.TaxNumber,
					TaxOffice = address.TaxOffice,
					City = address.City,
					Country = address.Country,
					County = address.County
				};
				wdAddress = await WithdrawAddressManager.Edit(withdrawAddress, null, db, true);

				if(products?.Any() ?? false) {
					var wDetails = new List<WithdrawDetail>();
					for(int i = 0; i < products.Count; i++) {
						var productId = ProductIds[i];
						var product = products.FirstOrDefault(p => p.ProductId == productId);
						wDetails.Add(new WithdrawDetail {
							CustomerId = order.CustomerId,
							ExpireDateTime = w.ExpireDateTime.Value,
							WithdrawId = w.Id,
							ProductId = productId,
							TotalAmount = product.Prices.FirstOrDefault(x => x.MonthCount == ProductMonths[i]).Amount,
							DiscountAmount = product.Prices.FirstOrDefault(x => x.MonthCount == ProductMonths[i]).DiscountedAmount,
							ProductName = product.Name
						});
					}
					details = await WithdrawDetailManager.EditMany(wDetails, null, db);
				}

				string cardExpire = props.CardExpire.Replace("/", string.Empty);
				string hash = GetHashData(_provisionPassword, _terminalId, orderId, props.CardNumber, Convert.ToUInt64(order.TotalAmount), 949);
				//_storeKey, amount, 949, "https://webapi.kitap12.com/garantiresponse/success", "sales", "https://webapi.kitap12.com/garantiresponse/success");

				string strXML = @"<?xml version=""1.0"" encoding=""iso-8859-9""?>
				<GVPSRequest>
				  <Mode>TEST</Mode>
				  <Version>512</Version>
				  <Terminal>
					<ProvUserID>" + _provUserId + @"</ProvUserID>
					<HashData>" + hash + @"</HashData>
					<UserID>" + _provUserId + @"</UserID>
					<ID>" + _terminalId + @"</ID>
					<MerchantID>" + _merchantId + @"</MerchantID>
				  </Terminal>
				  <Customer>
					<IPAddress>" + ip + @"</IPAddress>
					<EmailAddress>" + customer.Email + @"</EmailAddress>
				  </Customer>
				  <Card>
					<Number>" + props.CardNumber + @"</Number>
					<ExpireDate>" + cardExpire + @"</ExpireDate>
					<CVV2>" + props.CardCVV2 + @"</CVV2>
				  </Card>
				  <Order>
					<OrderID>" + orderId + @"</OrderID>
					<GroupID />" +
					//<Recurring>
					//  <Type>R</Type>
					//  <TotalPaymentNum></TotalPaymentNum>
					//  <FrequencyType></FrequencyType>
					//  <FrequencyInterval></FrequencyInterval>
					//  <StartDate></StartDate>
					//</Recurring>
					//@"<AddressList>
					//	<Address>
					//		<Type>B</Type>
					//		<Name>aaaaaaeee333</Name>
					//		<LastName>aaaaa</LastName>
					//		<Company>231</Company>
					//		<Text>Batıkent Carefour Karsısı / Jandarma Kıslası</Text>
					//		<District>BAĞCILAR</District>
					//		<City>İSTANBUL</City>
					//		<PostalCode>34200</PostalCode>
					//		<Country></Country>
					//		<PhoneNumber>5445445555</PhoneNumber>
					//	</Address>
					//</AddressList>
				  @"</Order>
				  <Transaction>
					<Type>sales</Type>
					<ListPageNum></ListPageNum>
					<Amount>" + Convert.ToUInt64(order.TotalAmount) + @"</Amount>
					<CurrencyCode>949</CurrencyCode>
					<CardholderPresentCode>0</CardholderPresentCode>
					<MotoInd>N</MotoInd>
				  </Transaction>
				</GVPSRequest>";

				string data = "data=" + strXML;
				WebRequest _WebRequest = WebRequest.Create(_url);
				_WebRequest.Method = "POST";
				byte[] byteArray = Encoding.UTF8.GetBytes(data);
				_WebRequest.ContentType = "application/x-www-form-urlencoded";
				_WebRequest.ContentLength = byteArray.Length;
				Stream dataStream = _WebRequest.GetRequestStream();
				dataStream.Write(byteArray, 0, byteArray.Length);
				dataStream.Close();
				WebResponse _WebResponse = _WebRequest.GetResponse();
				dataStream = _WebResponse.GetResponseStream();
				StreamReader reader = new(dataStream);
				string responseFromServer = reader.ReadToEnd();
				string XML = responseFromServer;
				XmlDocument xDoc = new();
				xDoc.LoadXml(XML);
				XmlElement xElement0 = xDoc.SelectSingleNode("//GVPSResponse/Transaction/RetRefNum") as XmlElement;
				XmlElement xElement1 = xDoc.SelectSingleNode("//GVPSResponse/Transaction/Response/ReasonCode") as XmlElement;
				//XmlElement xElement2 = xDoc.SelectSingleNode("//GVPSResponse/Transaction/Response/Message") as XmlElement;
				XmlElement xElement3 = xDoc.SelectSingleNode("//GVPSResponse/Transaction/Response/ErrorMsg") as XmlElement;
				bool hasError = false;
				if(xElement1?.InnerText != "00") {
					order.ExceptionMessage = xElement3?.InnerText ?? xElement1?.InnerText;
					if(order.Flags == 1)
						order.Flags = 4;
					order.TransactionId = xElement0?.InnerText;
					order = await base.Edit(order, null, db, true);
					hasError = true;
				}
				else {
					if(order.Flags == 1) {
						order.Flags = 2;
						order.TransactionId = xElement0?.InnerText;
						await base.Edit(order, null, db, true);
					}
				}
				await db.EndTransaction();
				if(hasError) {
					if(!string.IsNullOrEmpty(order?.ExceptionMessage))
						throw new MyException(order.ExceptionMessage);
					return null;
				}	
			}
			catch(MyException mex) {
				if(db != null)
					await db.EndTransaction(false);
				throw mex;
			}
			catch {
				if(db != null)
					await db.EndTransaction(false);
				throw;
			}
			return new OrderDto {
				Order = order,
				Customer = customer,
				Address = wdAddress,
				Details = details
			};
		}
	}
}


