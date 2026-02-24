using Core.Logging;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Web.BackEnd.Business.Manager {
	public class EmailManager {
		const string _from = "noreply@kitap12.com",
	   _displayName = "Kitap12",
	   _host = "5.9.161.84",
	   _pwd = "Kitap12**1";
	
		public static void SendEmail(string to, string body, string title, string? from = null, string? host = null, string? pwd = null, int? port = 0) {
			Task.Run(() => {
				try {
					if(string.IsNullOrEmpty(body) || string.IsNullOrEmpty(to))
						throw new Exception("Geçersiz E-posta Adresi ya da İçeriği");
					else {
						LogKeeper.LogInfo(body ?? "-");
						LogKeeper.LogInfo("Emailto  = " + to);
						MailMessage email = new();
						email.From = new MailAddress(from ?? _from, _displayName, Encoding.UTF8);
						MailAddress? mm = new(to);
						email.To.Add(mm);
						email.Subject = title ?? "Konu yok";
						email.IsBodyHtml = true;
						email.Body = body;
						email.BodyEncoding = email.SubjectEncoding = Encoding.UTF8;
						using SmtpClient smtp = new(host ?? _host, port ?? 587);
						smtp.Credentials = new NetworkCredential(from ?? _from, pwd ?? _pwd); //_credential;
																							  //smtp.EnableSsl = true;
																							  //smtp.UseDefaultCredentials = true;
						smtp.Send(email);
						return;
					}
				}
				catch(SmtpException sex) {
					LogKeeper.LogError("SMTP: " + sex.Message);
				}
				catch(Exception ex) {
					LogKeeper.LogError(ex.Message);
				}
			});
		}
	}
}
