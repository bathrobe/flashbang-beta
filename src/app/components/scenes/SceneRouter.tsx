'use client'
import NoInteraction from './sceneTypes/NoInteraction'
import MCKnowledgeCheck from './sceneTypes/MCKnowledgeCheck'
import MCDecisionPoint from './sceneTypes/MCDecisionPoint'
import AtomAssignment from './sceneTypes/AtomAssignment'
import { useSceneContext } from '@/app/contexts/SceneContext'

export default function SceneRouter() {
  const { currentScene, scenes } = useSceneContext()
  const scene = scenes[currentScene]

  if (scene.blockType === 'noInteraction') {
    return <NoInteraction scene={scene} />
  } else if (scene.blockType === 'mcKnowledgeCheck') {
    return <MCKnowledgeCheck scene={scene} />
  } else if (scene.blockType === 'mcDecisionPoint') {
    return <MCDecisionPoint scene={scene} />
  } else if (scene.blockType === 'atomAssignment') {
    return <AtomAssignment scene={scene} />
  }
}
