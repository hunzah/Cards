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
                <span>{children}</span>
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

type Sort = {
    key: string
    direction: 'asc' | 'desc'
} | null

export const TableContainer = (props:any) => {
    const headCells = props.headCells
   type Columns = keyof typeof headCells[number]
    const [sort, setSort] = useState<Sort>(null)

    const columns = Object.keys(headCells[0])
    console.log(headCells)

    const onclickHandler = (key:string) => {
        if (sort && sort.key === key) {

            setSort(sort.direction === "asc" ? {key, direction: 'desc'} : null)


        }else {
            console.log(2)
                setSort({
                    key,
                    direction: 'asc',
                })
            }
        }

    console.log( sort)
    return (
        <Table>
            <TableHead>
                <TableRow><TableHeadCell onClick={()=>onclickHandler("name")}>Name</TableHeadCell>
                    <TableHeadCell onClick={()=>onclickHandler("cardsCount")}>Cards</TableHeadCell>
                    <TableHeadCell onClick={()=>onclickHandler("updated")}>Updated</TableHeadCell>
                    <TableHeadCell onClick={()=>onclickHandler("createdBy")}>created by</TableHeadCell></TableRow>
               {/*     {columns.map(tc => {

                        const onclickHandler = () => {
                            if (tc === acolumn) {
                                setOrder(prevOrder => prevOrder === "asc" ? "desc" : "asc")
                            } else {
                                setacolumn(tc)
                                setOrder("desc")
                            }
                        }

                        return <TableHeadCell key={tc} onClick={onclickHandler}>{tc}</TableHeadCell>


                    })}*/}


            </TableHead>
            <TableBody>{headCells.map(deck=>{
                return (
                    <TableRow key={deck.id}>
                        <TableCell>{deck.name}</TableCell>
                        <TableCell>{deck.cardsCount}</TableCell>
                        <TableCell>{deck.updated}</TableCell>
                        <TableCell>{deck.author.name}</TableCell>
                    </TableRow>)
            })}</TableBody>
        </Table>
    )
}