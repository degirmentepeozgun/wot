using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class BillAddressManager : BusinessBase<BillAddress, string?> {

		public async Task<bool> Delete(string addressId, string userId) {
			Database? db = null;
			try {
				var _address = await base.Get(addressId);
				if(_address == null || _address?.CustomerId != userId)
					throw new MyException("Bu adres şahsınıza tanımlı değil");
				if(_address.IsHidden)
					throw new MyException("Bu adres zaten kaldırılmış");
				if(_address.IsMain)
					_address.Flags -= 1;
				_address.Flags += 128;
				db = new();
				await base.Edit(_address, null, db, true);
				return true;
			}
			catch(MyException mex) {
				if(db != null)
					await db.EndTransaction(false);
				throw mex;
			}
			catch(Exception) {
				if(db != null)
					await db.EndTransaction(false);
				throw;
			}
		}

		public async Task<bool> SetMain(string addressId, string userId) {
			bool result = false;
			Database? db = null;
			try {
				var _address = await base.Get(addressId);
				if(_address == null || _address?.CustomerId != userId)
					throw new MyException("Bu adres şahsınıza tanımlı değil");
				if(_address.IsMain)
					throw new MyException("Bu adres zaten ana adresiniz olarak tanımlı");
				var _mainAddress = (await base.Filter(new List<FilterCondition> { 
					new FilterCondition {
						ColumnName = "Flags",
						Operator = "&",
						Value = "1"
					},
					new FilterCondition  {
						ColumnName = "CustomerId",
						Value = userId
					} 
				}, 1, 1))?.Data?.FirstOrDefault();
				if(_mainAddress != null)
					_mainAddress.Flags -= 1;
				_address.Flags += 1;
				db = new(true);
				if(_mainAddress != null)
					await base.Edit(_mainAddress, null, db, true);
				await base.Edit(_address, null, db, true);
				await db.EndTransaction();
				result = true;
			}
			catch(MyException mex) {
				if(db != null)
					await db.EndTransaction(false);
				throw mex;
			}
			catch(Exception) {
				if(db != null)
					await db.EndTransaction(false);
				throw;
			}
			return result;
		}

	}
}
