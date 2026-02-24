using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class PortalPackageOrderManager : BusinessBase<PortalPackageOrder, Guid?> {
		readonly CustomerBookManager CustomerBookManager;
		readonly PortalPackageManager PortalPackageManager;
		readonly PortalPackageOrderBookManager PortalPackageOrderBookManager;
		readonly BasketManager BasketManager;
		public PortalPackageOrderManager(CustomerBookManager customerBookManager, 
			BasketManager basketManager,
			PortalPackageManager portalPackageManager,
			PortalPackageOrderBookManager portalPackageOrderBookManager) {
			this.CustomerBookManager = customerBookManager;
			this.PortalPackageManager = portalPackageManager;
			this.PortalPackageOrderBookManager = portalPackageOrderBookManager;
			this.BasketManager = basketManager;
		}

		//public async Task<List<PortalPackageOrderBook>?> GetOrderBooks(Guid orderId, string customerId) {
		//	List<FilterCondition> filters = new();
		//	filters.Add(new FilterCondition {
		//		ColumnName = "OrderId",
		//		Value = orderId.ToString()
		//	});
		//	filters.Add(new FilterCondition {
		//		ColumnName = "CustomerId",
		//		Value = customerId
		//	});
		//	var data = (await PortalPackageOrderBookManager.Filter(filters))?.Data;
		//	if(data?.Any() ?? false) {
		//		var expire = (await Get(orderId))?.ExpireDateTime;
		//		if(expire.HasValue)
		//			data.ForEach(x => x.Expire = expire);
		//	}
		//	return data;
		//}
		//public async Task<PortalPackageOrder?> HasOrder(string portalPackageId, string customerId) {
		//	List<FilterCondition> filters = new();
		//	filters.Add(new FilterCondition {
		//		ColumnName = "PortalPackageId",
		//		Value = portalPackageId
		//	});
		//	filters.Add(new FilterCondition {
		//		ColumnName = "CustomerId",
		//		Value = customerId
		//	});
		//	return (await base.Filter(filters, 1, 1, "createdatetime desc"))?.Data?.FirstOrDefault();
		//}

		//public async Task<PortalPackageOrder?> Order(string portalPackageId, string customerId, short month) {
		//	if(month != 12)
		//		throw new MyException("Şimdilik paketlerimizi 12 aylık haricinde bir dönem için satın alamazsınız");
		//	var order = await HasOrder(portalPackageId, customerId);
		//	if(order != null && order.ExpireDateTime > DateTime.Now)
		//		throw new MyException(order.ExpireDateTime.Value.ToShortDateString() + " tarihine kadar bu paket hesabınıza zaten tanımlıdır");
		//	var package = await PortalPackageManager.Get(portalPackageId, true);
		//	if(package == null)
		//		throw new MyException("Paket Bulunamadı");
		//	if(package.IsHidden)
		//		throw new MyException("Paket Satışa Kapalı");
		//	decimal price = 0;
		//	switch(month) {
		//		case 3:
		//			price = package.Month3Price;
		//			break;
		//		case 6:
		//			price = package.Month6Price;
		//			break;
		//		case 12:
		//			price = package.Month12Price;
		//			break;
		//		default:
		//			throw new MyException("Bu Satış Formatı Desteklenmiyor");
		//	}
		//	Database tran = new(true);
		//	try {
		//		DateTime orderExpire = DateTime.Today.AddDays(1).AddMonths(month);
		//		order = await base.Edit(new PortalPackageOrder {
		//			Code = new Random().Next(1000000000, int.MaxValue).ToString(),
		//			CustomerId = customerId,
		//			OwnerId = package.ListOwnerId,
		//			ExpireDateTime = orderExpire,
		//			Flags = 64,
		//			Name = package.Name,
		//			Price = price,
		//			PortalPackageId = portalPackageId
		//		}, dBWithTran: tran, doNotCommit: true);
		//		if(order == null)
		//			throw new MyException("Siparişiniz Alınamadı");
		//		var portalPackageBooks = (await PortalPackageManager.GetPortalPackageBooks(portalPackageId))?.Data;
		//		if(portalPackageBooks?.Any() ?? false) {
		//			await PortalPackageOrderBookManager.EditMany(portalPackageBooks.Select(x => new PortalPackageOrderBook {
		//				CustomerId = customerId,
		//				PortalPackageId = portalPackageId,
		//				OrderId = order.Id.Value,
		//				BookId = x.BookId,
		//				Name = x.Name
		//			}).ToList(), dBWithTran: tran);
		//			var customerBooks = portalPackageBooks.Select(x => new CustomerBook {
		//				IsEpub = x.IsEpub,
		//				Name = x.Name,
		//				CustomerId = customerId,
		//				BookId = x.BookId,
		//				PortalPackageOrderId = order.Id.Value,
		//				PortalPackageId = portalPackageId,
		//				Expire = orderExpire,
		//				Flags = 64
		//			}).ToList();
		//			customerBooks = await CustomerBookManager.EditMany(customerBooks, dBWithTran: tran);
		//			if(customerBooks?.Any() ?? false)
		//				await tran.EndTransaction();
		//			else
		//				throw new MyException("Siparişiniz Alınamadı");
		//			return order;
		//		}
		//	}
		//	catch(MyException mex) {
		//		if(tran != null)
		//			await tran.EndTransaction(false);
		//		throw mex;
		//	}
		//	catch(Exception) {
		//		if(tran != null)
		//			await tran.EndTransaction(false);
		//		throw;
		//	}
		//	return null;
		//}

		//public async Task<PortalPackageOrder?> OrderBasket(Guid basketId, string customerId, decimal price) {
		//	var basket = await BasketManager.ToggleActiveBasket(customerId);
		//	if(basket.Id != basketId)
		//		throw new MyException("") { StatusCode = 701 };
		//	var dto = await BasketManager.GetBasketItems(basketId);
		//	if(dto.TotalDiscountedPrice != price)
		//		throw new MyException("Sepet toplam fiyatı güncellendi");
		//	Database tran = new(true);
		//	try {
		//		DateTime orderExpire = DateTime.Today.AddDays(1).AddYears(1);
		//		var order = await base.Edit(new PortalPackageOrder {
		//			Code = new Random().Next(1000000000, int.MaxValue).ToString(),
		//			CustomerId = customerId,
		//			OwnerId = customerId,
		//			ExpireDateTime = orderExpire,
		//			Flags = 64,
		//			Name = "basket",
		//			Price = price
		//		}, dBWithTran: tran, doNotCommit: true);
		//		if(order == null)
		//			throw new MyException("Siparişiniz Alınamadı");
		//		var basketBooks = dto.Items;
		//		if(basketBooks?.Any() ?? false) {
		//			await PortalPackageOrderBookManager.EditMany(basketBooks.Select(x => new PortalPackageOrderBook {
		//				CustomerId = customerId,
		//				OrderId = order.Id.Value,
		//				BookId = x.Id,
		//				Name = x.Name
		//			}).ToList(), dBWithTran: tran);
		//			var customerBooks = basketBooks.Select(x => new CustomerBook {
		//				IsEpub = x.IsEpub,
		//				Name = x.Name,
		//				CustomerId = customerId,
		//				BookId = x.Id,
		//				PortalPackageOrderId = order.Id.Value,
		//				Expire = orderExpire,
		//				Flags = 64
		//			}).ToList();
		//			basket.Flags = 64;
		//			customerBooks = await CustomerBookManager.EditMany(customerBooks, dBWithTran: tran);
		//			if(customerBooks?.Any() ?? false) {
		//				await BasketManager.AcceptAndClearBasket(basketId, tran);
		//				await tran.EndTransaction();
		//			}
		//			else
		//				throw new MyException("Siparişiniz Alınamadı");
		//			return order;
		//		}
		//	}
		//	catch(MyException mex) {
		//		if(tran != null)
		//			await tran.EndTransaction(false);
		//		throw mex;
		//	}
		//	catch(Exception) {
		//		if(tran != null)
		//			await tran.EndTransaction(false);
		//		throw;
		//	}
		//	return null;
		//}
	}
}
