using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;

namespace Core.CryptoOrganizer
{
	public static class MyCryptoTools {
		static readonly IConfiguration? _configuration;
		static readonly string? _key, _iv;
		static string _x2 = "X2";
		static MyCryptoTools() {
			_configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json", false).Build();
			_key = _configuration["AESOptions:Key"];
			_iv = _configuration["AESOptions:IV"];
		}
		public static string? Decrypt(string cipher) {
			if(string.IsNullOrEmpty(cipher) || _key == null || _iv == null)
				return null;
			int len = cipher.Length % 4;
			if(len > 0)
				for(int i = 0; i < 4 - len; i++)
					cipher += '=';
			byte[] cipherText = Convert.FromBase64String(cipher.Replace(' ', '+'));
			byte[] Key = Encoding.UTF8.GetBytes(_key);
			byte[] IV = Encoding.UTF8.GetBytes(_iv);
			string? plaintext = null;
			using(Aes rijAlg = Aes.Create()) {
				rijAlg.Key = Key;
				rijAlg.IV = IV;
				ICryptoTransform decryptor = rijAlg.CreateDecryptor(rijAlg.Key, rijAlg.IV);
				using MemoryStream msDecrypt = new(cipherText);
				using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
				using StreamReader srDecrypt = new(csDecrypt);
				plaintext = srDecrypt.ReadToEnd();
			}
			return plaintext;
		}
		static string CreateMD5(string input) {
			using MD5 md5 = MD5.Create();
			byte[] inputBytes = Encoding.ASCII.GetBytes(input);
			byte[] hashBytes = md5.ComputeHash(inputBytes);
			StringBuilder sb = new();
			for(int i = 0; i < hashBytes.Length; i++)
				sb.Append(hashBytes[i].ToString(_x2));
			return sb.ToString();
		}
		public static string? Encrypt(string? plainText, bool md5 = false) {
			if(string.IsNullOrEmpty(plainText) || _key == null || _iv == null)
				return null;
			byte[] Key = Encoding.UTF8.GetBytes(_key);
			byte[] IV = Encoding.UTF8.GetBytes(_iv);
			string text = plainText;
			if(md5)
				text = CreateMD5(text);
			byte[] encrypted;
			using(Aes rijAlg = Aes.Create()) {
				rijAlg.Key = Key;
				rijAlg.IV = IV;
				ICryptoTransform encryptor = rijAlg.CreateEncryptor(rijAlg.Key, rijAlg.IV);
				using MemoryStream msEncrypt = new();
				using CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write);
				using(StreamWriter swEncrypt = new(csEncrypt)) {
					swEncrypt.Write(text);
				}
				encrypted = msEncrypt.ToArray();
			}
			return Convert.ToBase64String(encrypted);
		}
	}
}