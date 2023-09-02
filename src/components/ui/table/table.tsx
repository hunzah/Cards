import {clsx} from "clsx";
import {ComponentPropsWithoutRef, ElementRef, forwardRef, useState} from "react";
import s from './table.module.scss'
import {Typography} from "@/components/ui/typography";


export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
    ({className, ...rest}, ref) => {
        const classNames = {
            table: clsx(className, s.table),
        }

        return <table className={classNames.table} {...rest} ref={ref}/>
    }
)
export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
    ({className, children, ...rest}, ref) => {
        const classNames = {
            headCell: clsx(className, s.headCell),
        }

        return (
            <th className={classNames.headCell} {...rest} ref={ref}>
                {children}
            </th>
        )
    }
)
export const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
    ({className, ...rest}, ref) => {
        const classNames = {
            cell: clsx(className, s.tableCell),
        }

        return <td className={classNames.cell} {...rest} ref={ref}/>
    }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
    ({...rest}, ref) => {
        return <tr {...rest} ref={ref}/>
    }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
    ({...rest}, ref) => {
        return <tbody {...rest} ref={ref}/>
    }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
    ({...rest}, ref) => {
        return <thead {...rest} ref={ref}/>
    }
)


/*export const TableEmpty: FC<ComponentProps<'div'> & { mt?: string; mb?: string }> = ({
                                                                                         className,
                                                                                         mt = '89px',
                                                                                         mb,
                                                                                     }) => {
    const classNames = {
        empty: clsx(className, s.empty),
    }


    return (
        <Typography
            variant={'h2'}
            className={classNames.empty}
            style={{marginTop: mt, marginBottom: mb}}
        >
            Пока тут еще нет данных! :(
        </Typography>
    )
}*/
const headCells = [
    {
        id: 'name',
        numeric: 1,
        disablePadding: 53,
        label: 'Dessert (100g serving)',
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

type Columns = keyof typeof headCells[number]
export const TableContainer = () => {
    const [order, setOrder] = useState<"asc" | "desc">("desc")
    const [acolumn, setacolumn] = useState<Columns>("id")
    const columns = Object.keys(headCells[0]) as Columns


    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    console.log(order, acolumn, columns)
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map(tc => {

                        const onclickHandler = () => {
                            if (tc === acolumn) {
                                setOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc")
                            } else {
                                setacolumn(tc)
                                setOrder("desc")
                            }
                        }

                        return <TableHeadCell onClick={onclickHandler}>{tc}</TableHeadCell>


                    })}

                </TableRow>
            </TableHead>
            <TableBody>
                {headCells.map(hc=>{
                    return <TableRow>
                        {columns.map((cell,index)=> <TableCell>{hc[cell]}</TableCell> )}
                    </TableRow>
                })}
              {/*  <TableRow>
                    <TableCell>Drsdfsdxfs</TableCell>
                    <TableCell>3,as</TableCell>
                    <TableCell>red</TableCell>
                    <TableCell>12</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Stationery</TableCell>
                    <TableCell>18,000</TableCell>
                    <TableCell>19,00s0</TableCell>
                    <TableCell>12</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Stationery</TableCell>
                    <TableCell>18,0s00</TableCell>
                    <TableCell>18,000</TableCell>
                    <TableCell>12</TableCell>
                </TableRow>*/}
            </TableBody>
        </Table>
    )
}