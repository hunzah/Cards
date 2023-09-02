import {clsx} from "clsx";
import {ComponentPropsWithoutRef, ElementRef, forwardRef} from "react";
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
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];
export const TableContainer = () => {
    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    return  (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeadCell>Questions</TableHeadCell>
                    <TableHeadCell>Answer</TableHeadCell>
                    <TableHeadCell onClick={descendingComparator} >Last Updated</TableHeadCell>
                    <TableHeadCell>Grade</TableHeadCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Drsdfsdfs</TableCell>
                    <TableCell>3,0s00</TableCell>
                    <TableCell>third</TableCell>
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
                </TableRow>
            </TableBody>
        </Table>
    )
}