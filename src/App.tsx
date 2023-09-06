import {useState} from 'react'

import Layer2 from '../src/assets/images/Layer 2.svg'

import s from './components/ui/button/button.module.scss'
import {Checkbox} from './components/ui/checkbox'

import {SignUp} from '@/components/auth/sign-up'
import ComponentWithSvg from '@/components/ComponentWithSVG'
import {ForgotPassword} from '@/components/ui/auth-forgot-password/forgot-password.tsx'
import {Button} from '@/components/ui/button'
import {TabSwitcher} from '@/components/ui/tab-switcher'
import {Typography} from '@/components/ui/typography'
import {Table, TableContainer} from "@/components/ui/table";
import {Router} from "@/router";
import {Provider} from "react-redux";
import {store} from "@/services/store";


export function App() {
    const [checked, setChecked] = useState(false)
    const switches = [
        {id: 1, switchTitle: 'first', disabled: false},
        {id: 2, switchTitle: 'second', disabled: false},
        {id: 3, switchTitle: 'third', disabled: true},
    ]
    const headCells = [{
    cardsCount:0,
    cover:null,
    created:"2023-09-06T08:37:05.593Z",
    id:"clm7hke610fd8vo2qjtlykiq8",
    isBlocked:null,
    isDeleted:null,
    isPrivate:false,

    rating:0,
    shots:0,
    updated:"2023-09-06T08:37:05.593Z",
    userId:"f2be95b9-4d07-4751-a775-bd612fc9553a"
        },
        {
            id: 'calories',
            numeric: 2,
            disablePadding: 5,
            label: 'Calories',
        },
        {
            id: 'fat',
            numeric: 3,
            disablePadding: 2,
            label: 'Fat (g)',
        },
        {
            id: 'carbs',
            numeric: 4,
            disablePadding: 3,
            label: 'Carbs (g)',
        },
        {
            id: 'protein',
            numeric: 5,
            disablePadding: 3,
            label: 'Protein (g)',
        },
    ];
    const handleFormSubmitted = (data: any) => {
        console.log(data)
    }

    return (
        <div>
            {/*    <Checkbox checked={checked} onChange={setChecked} disabled={false} />
      <Typography variant="body2" component={'h3'}>
        Subheading
      </Typography>
      <Checkbox checked={checked} onChange={setChecked} label={'check-box'} disabled={false} />
      Hello
      <div>
        <Button className={s.button}>
          {' '}
          <ComponentWithSvg svg={Layer2} />
          Hello
        </Button>
        <Button className={s.button} variant="tertiary">
          <ComponentWithSvg svg={Layer2} /> qweWeW
        </Button>
        <Button className={s.button} variant="tertiary">
          qweWeW
        </Button>
        <Button className={s.button} variant="tertiary" disabled>
          qweWeW
        </Button>

        <Button className={s.button} as={'a'} href={'/link'} variant="link">
          as link
        </Button>
        <TabSwitcher switches={switches} />
        <ForgotPassword />
      </div>
      <SignUp onSubmit={handleFormSubmitted} />*/}
         {/*   <Button variant={"link"} className={s.button}>
                {' '}
                <ComponentWithSvg svg={Layer2}/>
                Hello
            </Button>
            asdasdasdasd
            <TableContainer/>*/}

            <Provider store={store}>
                <Router/>
            </Provider>

        </div>

    )
}
//scotch 1:00