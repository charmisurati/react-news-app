import React, { useEffect, useState, useRef, useCallback } from "react";
import "../App.css";
import noImg from "../images/no-img.png";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faL } from '@fortawesome/free-solid-svg-icons'
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from 'react-bootstrap/Pagination';
import PaginationCompo from "../Components/Pagination";
import Spinner from 'react-bootstrap/Spinner';



var GuardianData = [];
const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);


    // const initialState = [
    //     {
    //         imgSrc: "",
    //         title: "",
    //         url: ""
    //     }
    // ];

    const [startDate, setStartDate] = useState(new Date());
    const [query, setQuery] = useState("");
    const [searchParam, setSearchParam] = useState("bitcoin");
    const [apikey] = useState("f24f86d80c004325810d20ec45e2bf3c");
    const [isLoading, setIsLoading] = useState(true);

    // const [newsData, setNewsData] = useState(initialState);

    const [NewsApiEverythingData, setNewsAPiEverythingData] = useState([])
    const [GuardianApiData, setGuardianAPiData] = useState([])


    const [newsApiTopsHeandline, setNewsApiTopsHeadlineData] = useState([]);
    const [TopHeadlinesCategory, setTopsHeadlinesCategory] = useState('');

    const [sortDatabyDate, setDatabyDate] = useState("");

    // const [sortGuardianApiDate, setSortedGuardianApiDate] = useState("");

    // const [sortNewsApibySource, setSortedNewsApibySource] = useState("");


    // var newsApiUrl = `https://newsapi.org/v2/everything?q=${searchParam}&apikey=983e8f7ee85d47d29fbc83138eefc5a1`;

    const getTopsHeadlineData = async (pageNumber) => {
        var NewsApiTopHeadlines = `https://newsapi.org/v2/top-headlines?country=us&category=${TopHeadlinesCategory}&from=${sortDatabyDate}&to=${sortDatabyDate}&page=${pageNumber}&pageSize=${itemsPerPage}&apiKey=${apikey}`;

        axios.get(NewsApiTopHeadlines)
            .then(res => {
                console.log(res.data);
                if (res.data.status == "ok") {
                    setNewsApiTopsHeadlineData(res.data.articles);
                    setTotalPages(res.data.articles.length);

                }
            }).
            catch(error => console.error(`Error: ${error}`));

    }

    const getGuardianData = async (pageNumber) => {
        var GuardianApi = `https://content.guardianapis.com/search?q=${searchParam}&from-date=${sortDatabyDate}&to-date=${sortDatabyDate}&page=${pageNumber}&api-key=test`;

        axios.get(GuardianApi).then(res => {
            if (res.data.response.status == "ok") {
                console.log("Guardian", res.data.response);
                setGuardianAPiData(res.data.response.results)
                setTotalPages(res.data.response.results.length);
            }
        }).catch(error => console.error(`Error: ${error}`));

    }

    const getNewsEverythingData = async (pageNumber) => {

        var getNewsForBitCoins = `https://newsapi.org/v2/everything?q=${searchParam}&apiKey=${apikey}&from=${sortDatabyDate}&to=${sortDatabyDate}&page=${pageNumber}&pageSize=${itemsPerPage}`;

        axios.get(getNewsForBitCoins)
            .then(res => {
                console.log(res.data.articles);
                if (res.data.status == "ok") {
                    setNewsAPiEverythingData(res.data.articles);
                    setTotalPages(res.data.articles.length);
                    setIsLoading(false);
                }
            }).
            catch(error => console.error(`Error: ${error}`));


    }

    useEffect(() => {
        // getNewsEverythingData(currentPage);
        // getTopsHeadlineData(currentPage);
        // getGuardianData(currentPage);

        setTimeout(() => {
            getNewsEverythingData(currentPage);
        }, 2000);

    }, []);

    useEffect(() => {
        getNewsEverythingData();
        getTopsHeadlineData();
        getGuardianData();
    }, [TopHeadlinesCategory, sortDatabyDate, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // getNewsEverythingData(pageNumber);
        // getTopsHeadlineData(pageNumber);
    };


    const changeHandler = (e) => {
        setQuery(e.target.value)
        setSearchParam(e.target.value);
    }

    const searchHandler = (e) => {
        e.preventDefault();
        console.log("query", query);
        console.log("submit", searchParam);
        if (query == "") {
            setSearchParam("bitcoin");
        }
        getNewsEverythingData();
        getTopsHeadlineData();
        getGuardianData();
    }

    const SortDatabyDate = (date) => {
        // e.preventDefault();
        var formattedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        setStartDate(date);
        setDatabyDate(formattedDate);

        // setSortedNewsApiDate("publishedAt");
        // setSortedGuardianApiDate("published");
        // getNewsEverythingData();
        // getTopsHeadlineData();
        // getGuardianData();
    }

    const sortBySource = (e) => {
        switch (e.target.value) {
            case "1":
                // setItemsPerPage(10);
                // console.log(itemsPerPage);
                setGuardianAPiData([]);
                setNewsAPiEverythingData([]);
                setNewsApiTopsHeadlineData([]);
                getNewsEverythingData();
                break;
            case "2":
                // setItemsPerPage(10);
                setGuardianAPiData([]);
                setNewsAPiEverythingData([]);
                setNewsApiTopsHeadlineData([]);
                getTopsHeadlineData();
                break;
            case "3":
                //setItemsPerPage(10);
                setGuardianAPiData([]);
                setNewsAPiEverythingData([]);
                setNewsApiTopsHeadlineData([]);
                getGuardianData();
                break;
            default:
                break;
        }

    }

    const getCategory = (e) => {
        e.preventDefault();

        switch (e.target.value) {
            case "1":
                setTopsHeadlinesCategory("business");
                console.log(TopHeadlinesCategory);
                break;
            case "2":
                setTopsHeadlinesCategory("entertainment");
                break;
            case "3":
                setTopsHeadlinesCategory("health");
                break;
            case "4":
                setTopsHeadlinesCategory("science");
                break;
            case "5":
                setTopsHeadlinesCategory("sports");
                break;
            case "6":
                setTopsHeadlinesCategory("technology");
                break;
            default:
                break;
        }

    }

    const sortByAuthor = (e) => {
    }

    return (
        <React.Fragment>
            <div className="container-fluid mt-3">
                <div className="w-100 h-100">
                    <div className="content-wrapper">
                        <div className="d-md-flex justify-content-between d-sm-block">
                            <h5>Today</h5>
                            <div className="d-md-flex align-items-center">
                                <form className="d-flex" onSubmit={searchHandler}>
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => changeHandler(e)} />
                                    <button className="btn btn-outline-success me-2" type="submit">Search</button>
                                </form>

                                <div className="dropdown my-4 my-md-0">
                                    <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faFilter} className="filter-icon" />Sort By
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li className="my-2">
                                            <DatePicker showIcon selected={startDate} onChange={(date) => SortDatabyDate(date)} className="form-control" />

                                        </li>

                                        <li className="my-2">
                                            <select className="form-select" aria-label="Default select example" onChange={(e) => getCategory(e)}>
                                                <option defaultValue>Select Category</option>
                                                <option value="1" >Bussiness</option>
                                                <option value="2">Entertainment</option>
                                                <option value="3">Health</option>
                                                <option value="4">Science</option>
                                                <option value="5">Sports</option>
                                                <option value="6">Technology</option>
                                            </select>
                                        </li>
                                        <li className="my-2">

                                            <select className="form-select" aria-label="Default select example" onChange={(e) => sortBySource(e)}>
                                                <option defaultValue>Select Source</option>
                                                <option value="1" >NewsApi everything</option>
                                                <option value="2">NewsApi TopHeadlines</option>
                                                <option value="3">Guardian</option>
                                            </select>
                                        </li>
                                        {/* <li className="my-2"><a className="dropdown-item" href="#" onClick={sortByAuthor}>Sort By Author</a></li> */}
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="news-body mt-3">

                            {
                                isLoading ? <div className="text-center"><Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner></div> :

                                    <div className="news-content">
                                        {
                                            NewsApiEverythingData.map((v, key) => {
                                                {/* console.log(v); */ }
                                                return (
                                                    <div key={key} className="news-data">
                                                        <div>
                                                            {
                                                                v.urlToImage == null ? <img src={noImg} alt="No Image" /> : <img src={v.urlToImage} alt="image" />
                                                            }

                                                        </div>
                                                        <div className="py-3 px-3">
                                                            <h6>{v.source.name}</h6>
                                                            <p>{v.title}</p>
                                                            <Link to={v.url} target="_blank"> View More </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        {newsApiTopsHeandline.map((v, key) => {
                                            return (
                                                <div key={key} className="news-data">
                                                    <div>
                                                        <img src={v.urlToImage} alt="image" />
                                                    </div>
                                                    <div className="py-3 px-3">
                                                        {/* <h6>{v.source.name}</h6> */}
                                                        <p>{v.title}</p>
                                                        <Link to={v.url} target="_blank"> View More </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {GuardianApiData.map((v, key) => {
                                            return (
                                                <div key={key} className="news-data">
                                                    <div>
                                                        <img src={noImg} alt="image" />
                                                    </div>
                                                    <div className="py-3 px-3">
                                                        {/* <h6>{v.source.name}</h6> */}
                                                        <p>{v.webTitle}</p>
                                                        <p>{v.sectionName}</p>
                                                        <Link to={v.webUrl} target="_blank"> View More </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                            }
                        </div>
                    </div>
                </div>

            </div>

            {
                isLoading == false && <PaginationCompo handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
            }



        </React.Fragment>
    )

}

export default Home;