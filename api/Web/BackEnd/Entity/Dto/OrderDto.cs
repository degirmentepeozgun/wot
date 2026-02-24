using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Entity.Dto {
	public class OrderDto {
        public Customer? Customer { get; set; }
        public Withdraw? Order { get; set; }
        public WithdrawAddress? Address { get; set; }
        public List<WithdrawDetail>? Details { get; set; }
        public string? ThreeDForm { get; set; }
    }
}
