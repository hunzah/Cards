import s from './play-deck.module.scss'

import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'

type PlayDeckProps = {
  closeModalCallback: (value: boolean) => void
  PackName: string
}
export const PlayDeck = ({ closeModalCallback, PackName }: PlayDeckProps) => {
  const showNext = () => {
    console.log('Next Question')
  }

  return (
    <div>
      <TemplateModal
        closeModalCallback={closeModalCallback}
        className={s.root}
        title={`Learn "${PackName}"`}
        buttonName="Next Question"
        mainActionCallback={showNext}
      >
        <div></div>
      </TemplateModal>
    </div>
  )
}
