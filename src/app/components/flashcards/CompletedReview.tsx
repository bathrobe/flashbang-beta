import dayjs from 'dayjs'
export default function CompletedReview({ reviewedCards }: { reviewedCards: any[] }) {
  return (
    <div className="text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p>You've completed all your due cards for today</p>
      <div className="mt-8 flex flex-col">
        {reviewedCards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300 w-96 mx-auto"
          >
            <h3 className="text-lg font-semibold mb-2">{card.flashcard.title}</h3>
            <p className="text-sm text-gray-600 mb-1">Lesson: {card.lesson.title}</p>
            <p className="text-sm text-gray-600 mb-1">
              Next due: {dayjs(card.current.due).format('MMMM D, YYYY')}
            </p>
            <p className="text-sm text-gray-600">
              Last review:{' '}
              {card.log[0]?.rating
                ? ['Again', 'Hard', 'Good', 'Easy'][card.log[0].rating - 1]
                : 'N/A'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
