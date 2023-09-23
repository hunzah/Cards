import s from "./sliderLoader.module.scss"
import {useAppSelector} from "@/hooks";
export const SliderLoader = () => {
    const sliderValues = useAppSelector(state => state.slider)
    return (
        <div className={s.sliderLoader}>
              <span className={s.SliderLoaderValuesNumber}>
       {sliderValues.sliderCurrentValues[0] ||0}
      </span>
            <div className={s.sliderText}><div className={s.leftThumb}></div>loading
                <div className={s.rightThumb}></div></div>
            <span className={s.SliderLoaderValuesNumber}>
        {sliderValues.sliderCurrentValues[1] || "..."}
      </span>
        </div>
    )
}