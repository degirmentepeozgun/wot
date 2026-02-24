using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Core.DataAccess;
using Core.EntityTemplates.Concrete;
using Core.EntityTemplates.Extension;
using Web.BackEnd.Business.Extension;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class PortalPackageManager : BusinessBase<PortalPackage, string> {
		readonly PortalPackageBookManager PortalPackageBookManager;
		readonly BookManager BookManager;
		public PortalPackageManager(PortalPackageBookManager portalPackageBookManager, BookManager bookManager) {
			PortalPackageBookManager = portalPackageBookManager;
			this.BookManager = bookManager;
		}

		//public async Task<DBReturnObject<List<PortalPackageBook>>?> GetPortalPackageBooks(string portalPackageId, int? page = 1, int? pageSize = int.MaxValue) {
		//	var filters = new List<FilterCondition> {
		//		new FilterCondition{
		//			ColumnName = "PortalPackageId",
		//			Value = portalPackageId
		//		}
		//	};
		//	var portalPackageBooksObject = (await PortalPackageBookManager.Filter(filters, page.Value, pageSize.Value));
		//	var portalPackageBooks = portalPackageBooksObject?.Data;
		//	if(portalPackageBooks?.Any() ?? false) {
		//		filters.Clear();
		//		filters.AddRange(portalPackageBooks.Select(x => new FilterCondition {
		//			ColumnName = _primaryKeyColumnName,
		//			Value = x.BookId
		//		}));
		//		var books = (await BookManager.Filter(filters))?.Data;
		//		if(books?.Any() ?? false)
		//			foreach(var portalPackageBook in portalPackageBooks) {
		//				var book = books.FirstOrDefault(y => y.Id == portalPackageBook.BookId);
		//				portalPackageBook.Name = book?.Name ?? "Undefined";
		//				portalPackageBook.IsEpub = book?.IsEpub ?? false;
		//				portalPackageBook.PrintedPrice = book?.PrintedPrice ?? 0;
		//			}
		//	}
		//	return portalPackageBooksObject;
		//}
		//public async Task<List<PortalPackage>?> GetRelatedPortalPackages(string portalPackageId, int count) {
		//	var portalPackage = await Get(portalPackageId, true);
		//	var filters = new List<FilterCondition> {
		//		new FilterCondition{
		//			ColumnName = _primaryKeyColumnName,
		//			Operator = "!=",
		//			Value = portalPackageId
		//		}
		//	};
		//	if(portalPackage?.ListOwnerId != null)
		//		filters.Add(new FilterCondition {
		//			ColumnName = "ListOwnerId",
		//			Value = portalPackage.ListOwnerId
		//		});
		//	filters.ExcludeHiddenRecords();
		//	return (await base.Filter(filters, 1, count))?.Data;
		//}

		//public async Task<IEnumerable<PortalPackage>?> GetPackages(string[] ids) {
		//	if(!(ids?.Any() ?? false))
		//		throw new MyException("Geçersiz ID");
		//	var filters = ids.Select(x => new FilterCondition {
		//		ColumnName = _primaryKeyColumnName,
		//		Value = x
		//	}).ToList();
		//	filters.ExcludeHiddenRecords();
		//	var result = (await base.Filter(filters))?.Data;
		//	return result?.OrderBy(x => Array.IndexOf(ids, x.Id));
		//}

		//public async Task<List<PortalPackage>?> GetPackagesByBook(string bookId, int count) {
		//	var filters = new List<FilterCondition> {
		//		new FilterCondition {
		//			ColumnName = "BookId",
		//			Value = bookId
		//		}
		//	};
		//	var packageIds = (await PortalPackageBookManager.Filter(filters))?.Data?.Select(x => x.PortalPackageId)?.Distinct();
		//	if(packageIds?.Any() ?? false) {
		//		filters.Clear();
		//		filters.AddRange(packageIds.Select(x =>
		//		new FilterCondition {
		//			ColumnName = _primaryKeyColumnName,
		//			Value = x
		//		}));
		//		return (await base.Filter(filters, 1, count))?.Data;
		//	}
		//	return null;
		//}
	}
}
