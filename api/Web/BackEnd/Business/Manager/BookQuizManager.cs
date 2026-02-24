using Core.BusinessTemplates.Concrete;
using Core.BusinessTemplates.Entity;
using Web.BackEnd.Entity.Concrete;

namespace Web.BackEnd.Business.Manager {
	public class BookQuizManager : BusinessBase<BookQuiz, Guid?> {
		readonly BookQuizAnswerManager BookQuizAnswerManager;
		public BookQuizManager(BookQuizAnswerManager bookQuizAnswerManager) {
			BookQuizAnswerManager = bookQuizAnswerManager;
		}

		public async Task<BookQuizAnswer?> SaveGivenAnswer(BookQuizAnswer answer) {
			return await BookQuizAnswerManager.Edit(answer);
		}

		/// <summary>
		/// Kitabın hangi sorularına o öğrenci nasıl cevaplar vermiş
		/// </summary>
		/// <param name="bookId"></param>
		/// <param name="clientId"></param>
		/// <returns></returns>
		public async Task<List<BookQuizAnswer>?> GetQuizAnswers(string bookId, string clientId) {
			List<FilterCondition> filters = new();
			filters.Add(new FilterCondition {
				ColumnName = "ClientId",
				Value = clientId
			});
			filters.Add(new FilterCondition {
				ColumnName = "BookId",
				Value = bookId
			});
			return (await BookQuizAnswerManager.Filter(filters))?.Data;
		}
	}
}
