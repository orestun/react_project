import "../css/pagination_style.css"
import prevAvailable from "../img/pagination_prev_available.png"
import nextAvailable from "../img/pagination_next_available.png"
import {Link} from "react-router-dom";

function getPaginationPages(PageNumber, Pages){
    const pagesInPagination = 5;
    if(Pages <= pagesInPagination){
        return fillPaginationFromBeginToEnd(1, Pages, PageNumber)
    }else{
        if(Pages - PageNumber >= pagesInPagination){
            let items = [];
            for (let i = PageNumber; i < PageNumber + (pagesInPagination - 2); i++){
                items.push({index: i});
            }
            items.push({index: '...'})
            items.push({index: Pages})
            return items;
        }
        else{
            return fillPaginationFromBeginToEnd(Pages - pagesInPagination + 1, Pages, PageNumber)
        }
    }
}

function fillPaginationFromBeginToEnd(begin, end, selected) {
    let items = [];
    for (let i = begin; i <= end; i++) {
        items.push({index: i})
    }
    return items;
}


const Pagination = (props)=>{
    const PageNumber = props.PageNumber
    const Pages = props.Pages
    const paginationPages = getPaginationPages(PageNumber, Pages)

    const scrollUp = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="pagination">
            {PageNumber > 1? <Link onClick={scrollUp} to={"http://localhost:3000/?page=".concat((PageNumber-1).toString())}>
                    <a className="item previous"><img src={prevAvailable} alt="prev" width="20px"/></a>
            </Link>
                 : ""}
            {paginationPages.map((page) =>
                <Link onClick={scrollUp} to={page.index === "..."? "": "http://localhost:3000/?page=".concat(page.index)}>
                    <a className={`item${page.index === PageNumber ? ' selected' : ''}`}>
                        {page.index}
                    </a>
                </Link>

            )}
            {PageNumber < Pages?
                <Link onClick={scrollUp} to={"http://localhost:3000/?page=".concat((PageNumber+1).toString())}>
                    <a className="item next"><img src={nextAvailable} alt="next" width="20px"/></a>
                </Link>
                 : ""}

        </div>
    )
}

export default Pagination