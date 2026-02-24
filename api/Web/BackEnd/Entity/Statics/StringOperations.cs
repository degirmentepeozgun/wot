namespace Web.BackEnd.Entity.Statics {
	public static class StringOperations {
		public static string CheckPassword(string password) {
			int length = password.Length;
			if(length < 8)
				return "Şifre en az 8 karakter uzunluğunda olmalıdır";
			bool hasNumber = false, hasUpperLetter = false;
			List<int> ascies = new();
			foreach( char c in password) {
				if(!hasNumber && char.IsDigit(c))
					hasNumber = true;
				if(!hasUpperLetter && char.IsUpper(c))
					hasUpperLetter = true;
				ascies.Add(c);
			}
			int count = 0;
			for(int i = 1; i < ascies.Count; i++)
				if(Math.Abs(ascies[i - 1] - ascies[i]) == 1) {
					count++;
					if(count > 2)
						return "Şifrenizde ardışık tekrar eden 'abc', '123' gibi ifadeler kullanamazsınız";
				}
				else
					count = 0;
			if(!hasNumber)
				return "Şifre en az 1 adet rakam içermelidir";
			if(!hasUpperLetter)
				return "Şifre en az 1 adet büyük harf içermelidir";
			return null;
		}
	}
}
