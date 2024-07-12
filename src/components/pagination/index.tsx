import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
    page: number;
    totalPages: number;
    setPage: Function
}

const PaginationDemo: React.FC<PaginationProps> = ({ page, totalPages, setPage }) => {
    return (
        <Pagination className="mb-4">
            <PaginationContent>
                <PaginationItem 
                    onClick={() => {
                        if(page!=1)
                        setPage(page-1)
                    }}>
                    <PaginationPrevious disabled={page==1}/>
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}
                        onClick={() => {
                            setPage(index + 1)
                        }}>
                        <PaginationLink isActive={index + 1 == page}
                        >{index + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem
                    onClick={() => {
                        if(page!=totalPages)
                        setPage(page+1)
                    }}>
                    <PaginationNext disabled={page==totalPages}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default PaginationDemo
