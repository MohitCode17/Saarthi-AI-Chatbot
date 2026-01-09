import { Annotation, MessagesAnnotation } from "@langchain/langgraph";

/**
 * Frontdesk Agent → will be decide who'll be the next representative agent
 * Like → Marketing or Learning (In our workflow)
 * Frontdesk agent need to store that decision on state,
 * Since this state will tells to the next node that who gonna be
 * next representive?
 */

export const StateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
  nextRepresentative: Annotation,
});
