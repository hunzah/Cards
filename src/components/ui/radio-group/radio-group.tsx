import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

export const RadioGroupUI = () => (
  <form>
    <RadioGroup.Root className={s.RadioGroupRoot} defaultValue="default" aria-label="View density">
      <div className={s.RadioGroupItemBox}>
        <RadioGroup.Item className={s.RadioGroupItem} value="default" id="r1">
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r1">
          Default
        </label>
      </div>
      <div className={s.RadioGroupItemBox}>
        <RadioGroup.Item className={s.RadioGroupItem} value="comfortable" id="r2">
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r2">
          Comfortable
        </label>
      </div>
      <div className={s.RadioGroupItemBox}>
        <RadioGroup.Item className={s.RadioGroupItem} value="compact" id="r3">
          <RadioGroup.Indicator className={s.RadioGroupIndicator} />
        </RadioGroup.Item>
        <label className={s.Label} htmlFor="r3">
          Compact
        </label>
      </div>
    </RadioGroup.Root>
  </form>
)
