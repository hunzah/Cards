import s from './edit-pack.module.scss'

import { Checkbox } from '@/components/ui/checkbox'
import { TemplateModal } from '@/components/ui/modals/template/template-modal.tsx'
import { TextField } from '@/components/ui/text-field'
import { useAppDispatch, useAppSelector } from '@/hooks.ts'
import { useUpdateDeckMutation } from '@/services/decks/decks.service.ts'
import { setDeckName, setDeckPrivacy } from '@/services/decks/decks.slice.ts'

type Props = {
  closeModalCallback: (isEditPackOpen: boolean) => void
}
export const EditPack = ({ closeModalCallback }: Props) => {
  const [updateDeck, { isLoading }] = useUpdateDeckMutation()
  const {
    DeckId: id,
    DeckPrivacy: isPrivate,
    DeckName: value,
  } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()

  const inputHandler = (e: string) => dispatch(setDeckName(e))

  const checkboxHandler = (e: boolean) => dispatch(setDeckPrivacy(e))

  const mainActionCallback = async () => {
    await updateDeck({ id: id, params: { name: value, isPrivate: isPrivate } })
    setDeckName('')
    closeModalCallback(false)
  }

  return (
    <TemplateModal
      value={value}
      className={s.root}
      title="Edit Pack"
      buttonName="Save Changes"
      closeModalCallback={closeModalCallback}
      mainActionCallback={mainActionCallback}
    >
      <div className={s.content}>
        <TextField
          value={value}
          onChangeValue={inputHandler}
          inputName="Name Pack"
          inputIsSearch={false}
          inputType={'text'}
          placeholder={'Name'}
          className={s.input}
        />
        <Checkbox checked={isPrivate} onChange={checkboxHandler} label="Private pack" />
      </div>
      {isLoading && (
        <div style={{ position: 'fixed', color: 'aqua', top: '50%', right: '50%' }}>Loading...</div>
      )}
    </TemplateModal>
  )
}
