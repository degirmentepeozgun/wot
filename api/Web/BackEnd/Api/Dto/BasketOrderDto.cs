namespace Web.BackEnd.Api.Dto {
	public class BasketOrderDto {
		public Guid BasketId {
			get; set;
		}
        public decimal TotalDiscountedPrice { get; set; }
    }
}
