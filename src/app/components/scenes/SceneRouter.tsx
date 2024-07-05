'use client'
import NoInteraction from './NoInteraction'
import MCKnowledgeCheck from './MCKnowledgeCheck'
import MCDecisionPoint from './MCDecisionPoint'
import AtomAssignment from './AtomAssignment'
import { useSceneContext } from '@/app/contexts/SceneContext'

export default function SceneRouter() {
  const { currentScene, scenes } = useSceneContext()
  const scene = scenes[currentScene]

  console.log(scene)
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
