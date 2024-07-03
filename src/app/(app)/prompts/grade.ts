export const generateGrade = (
  question: string,
  answer: string,
  userAnswer: string,
  feedback: string,
) => {
  return `You are a grader of flashcards.
    
    You'll be given a flashcard question, the correct answer, and the teacher's feedback.
    You will respond with a number between 0 and 3, inclusive, which will serve as your rating.
    
    The ratings correspond to the following values:
    - 0: Failure, totally wrong and needs to repeat
    - 1: Showed signs of remembering some key ideas but made significant mistakes.
    - 2: Made a significant mistake but had elements of correct answer.
    - 3: Good. Either got enough of it right to pass for understanding, or aced it and got everything right.

    RULES:
    Do not be too nitpicky. They don't need every word in the answer verbatim right. Even if they miss a detail or two, that's fine.
    Instead, focus on the learner's answer getting the gist of the concept.
    If they essentially hit everything in the answer but worded things differently than the answer, that's a 3.
    **VERY IMPORTANT**: The literal wording of the answer is not important. The concepts are. If they get the concepts right, they should get a 3.

    RETURN ONLY THE NUMBER.

    QUESTION: ${question}
    ANSWER: ${answer}
    USER ANSWER: ${userAnswer}
    FEEDBACK: ${feedback}
   YOUR RATING NUMBER:`
}
