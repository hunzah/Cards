//todo fix problem with radix import
// @ts-ignore
import * as RadioGroup from '@radix-ui/react-radio-group'

import s from '@/components/ui/radio-group/radio-group-form.module.scss'

type RadioGroupUIType = {
  onChangeValue?: (newValue: number) => void
}
export const RadioGroupUI = (props: RadioGroupUIType) => {
  const handleValueChange = (newValue: string) => {
    console.log(newValue)
    props.onChangeValue && props.onChangeValue(Number(newValue))
  }

  return (
    <form>
      <RadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue="default"
        aria-label="View density"
        onValueChange={handleValueChange}
      >
        <div className={s.RadioGroupItemBox}>
          <RadioGroup.Item className={s.RadioGroupItem} value="1" id="r1">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r1">
            Did not know
          </label>
        </div>
        <div className={s.RadioGroupItemBox}>
          <RadioGroup.Item className={s.RadioGroupItem} value="2" id="r2">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r2">
            Forgot
          </label>
        </div>
        <div className={s.RadioGroupItemBox}>
          <RadioGroup.Item className={s.RadioGroupItem} value="3" id="r3">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r3">
            A lot of though
          </label>
        </div>
        <div className={s.RadioGroupItemBox}>
          <RadioGroup.Item className={s.RadioGroupItem} value="4" id="r4">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r4">
            Confused
          </label>
        </div>
        <div className={s.RadioGroupItemBox}>
          <RadioGroup.Item className={s.RadioGroupItem} value="5" id="r5">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r5">
            Knew the answer
          </label>
        </div>
      </RadioGroup.Root>
    </form>
  )
}
