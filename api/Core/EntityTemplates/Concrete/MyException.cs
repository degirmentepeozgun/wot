namespace Core.EntityTemplates.Concrete {
	public class MyException : Exception {
        public MyException(string message, int? statusCode = null) : base(message) {
			this.StatusCode = statusCode;
		}
		public bool Log {
			get; set;
		}
		public int? StatusCode {
			get; set;
		}
	}
}
