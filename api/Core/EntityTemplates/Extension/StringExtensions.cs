using System.Globalization;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Core.EntityTemplates.Extension {
	public static class StringExtensions {
		static readonly string[] _invalidEmailBodyKeywords = { "<iframe", "<script" };
		static readonly string[] _operators = { "501", "505", "506", "507", "551", "552", "553", "554", "555", "559", "530", "531", "532", "533", "534", "535", "536", "537", "538", "539", "561", "540", "541", "542", "543", "544", "545", "546", "547", "548", "549" };
		static readonly Regex _spaceTrimPattern = new(@"\s+", RegexOptions.Compiled | RegexOptions.Multiline);
		static readonly Regex _escapeTrimPattern = new(@"\n|\t|\r|</?p>", RegexOptions.Compiled | RegexOptions.Multiline);
		static readonly Regex _titleReplacePattern = new(@" (ile|ve|veya|ama) ", RegexOptions.Compiled | RegexOptions.IgnoreCase);
		static readonly Regex _trimPattern = new(@"\s{2,}", RegexOptions.Compiled);
		static readonly Regex _fixPattern = new(@"\s*[.]", RegexOptions.Compiled);
		static readonly string[] prepositions = new[] { "ve", "veya", "ile", "ama" };
		static readonly CultureInfo trCulture = new("tr-TR", false);
		public static MailAddress? ConvertToMailAddress(this string email) {
			try {
				MailAddress m = new(email);
				if(!string.IsNullOrEmpty(m.Address))
					return m;
			}
			catch {
			}
			return null;
		}
		public static bool IsValidMail(this string email) {
			try {
				return ConvertToMailAddress(email) != null;
			}
			catch {
				return false;
			}
		}
		public static string? Minify(this string input) {
			if(input == null)
				return null;
			return _spaceTrimPattern.Replace(_escapeTrimPattern.Replace(input.Trim(), string.Empty), " ");
		}
		public static string ToFirstLetterUpper(this string input) {
			if(input == null)
				return string.Empty;
			string[] words = input.Split(' ', StringSplitOptions.RemoveEmptyEntries);
			int ppIndex = -1;
			for(int i = 0; i < words.Length; i++) {
				ppIndex = Array.IndexOf(prepositions, words[i].ToLower(trCulture));
				if(ppIndex != -1) {
					words[i] = prepositions[ppIndex];
					continue;
				}
				if(char.IsLower(words[i][0]))
					words[i] = string.Concat(words[i][0].ToString().ToUpper(trCulture), words[i].AsSpan(1));
			}
			return string.Join(' ', words);
		}
		public static string TitleCase(this string input, char? defaultChar = null, char[]? allowedChars = null) {
			if(input == null)
				return string.Empty;
			input = _fixPattern.Replace(input.Trim(), ".");
			input = input.Replace(".", ". ").Replace("-", " - ");
			input = _trimPattern.Replace(input.Trim().ToLower(trCulture), " ");
			input = _titleReplacePattern.Replace(input.ToFirstLetterUpper(), match => {
				return match.Groups[0].Value.ToLower(trCulture);
			});
			char _def = defaultChar ?? '-';
			if(input.Length > 0) {
				string result = string.Empty;
				char prevChar = _def;
				foreach(char c in input) {
					if(char.IsWhiteSpace(c)) {
						if(prevChar.IsTitleChar() && prevChar != '.')
							continue;
						else if(!prevChar.IsTitleChar())
							goto next;
					}
					if(c.IsTitleChar()) {
						if(!prevChar.IsTitleChar()) {
							if(!allowedChars?.Contains(c) ?? true) {
								result += _def;
								goto next;
							}
						}
						else
							goto next;
					}
					else if(char.IsWhiteSpace(prevChar))
						result += prevChar;
					result += c;
				next:
					prevChar = c;
				}
				input = result;
			}
			input = new Regex("^[" + _def + "]|[" + _def + "]$").Replace(input, string.Empty);
			return input;
		}
		static bool IsTitleChar(this char c) {
			return c == '-' || (!char.IsLetterOrDigit(c) && !char.IsWhiteSpace(c));
		}
		public static string? GetPhone(this string phone) {
			if(phone == null)
				return null;
			string p = string.Empty;
			foreach(char c in phone)
				if(char.IsDigit(c))
					p += c;
			if(p?.Length == 10)
				p = "90" + p;
			else if(p?.Length == 11)
				p = "9" + p;
			if(p?.Length != 12)
				return null;
			if(p[0] != '9' || p[1] != '0')
				return null;
			if(Array.IndexOf(_operators, p.Substring(2, 3)) == -1)
				return null;
			return p;
		}
		public static bool IsValidCitizenNumber(this string id) {
			if(id?.Length != 11)
				return false;
			if(id[0] == '0')
				return false;
			int odds = 0, evens = 0, total = 0, item;
			for(int i = 0; i < 11; i++) {
				item = Convert.ToInt32(id[i].ToString());
				if(i < 10) {
					if(i % 2 == 0)
						odds += item;
					else
						evens += item;
					total += item;
				}
			}
			if(id[10].ToString() != (total % 10).ToString())
				return false;
			if(id[9].ToString() != (((odds * 7) + (evens * 9)) % 10).ToString())
				return false;
			return true;
		}
		public static bool IsValidEmailBody(this string body) {
			if(string.IsNullOrEmpty(body))
				return false;
			foreach(string keyword in _invalidEmailBodyKeywords)
				if(body.Contains(keyword))
					return false;
			return true;
		}
	}
}
