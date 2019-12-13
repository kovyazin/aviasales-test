import * as axios from 'axios';

const SET_SEARCH_ID = 'SET_SEARCH_ID';
const SET_TICKETS = 'SET_TICKETS';
const SET_CHECKED_FILTER = 'SET_CHECKED_FILTER';
const SET_UNCHECKED_FILTER = 'SET_UNCHECKED_FILTER';
const SET_UNCHECKED_ALL_FILTERS = 'SET_UNCHECKED_ALL_FILTERS';
const SET_CHECKED_ALL_FILTERS = 'SET_CHECKED_ALL_FILTERS';
const CHANGE_METHOD_SORT = 'CHANGE_METHOD_SORT';

const initialState = {
  searchId: null,
  tickets: [],
  filters: [
    { label: 'Все', isChecked: true, id: 1, isAll: true },
    { label: 'Без пересадок', isChecked: true, id: 2, stops: 0 },
    { label: '1 пересадка', isChecked: true, id: 3, stops: 1 },
    { label: '2 пересадки', isChecked: true, id: 4, stops: 2 },
    { label: '3 пересадки', isChecked: true, id: 5, stops: 3 }
  ],
  methodSort: 'price' // 'price', 'speed'
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_SEARCH_ID:
      return {
        ...state,
        searchId: action.searchId
      }
    case SET_TICKETS:
      return {
        ...state,
        tickets: action.tickets
      }
    case SET_CHECKED_FILTER:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          if (filter.id === action.id) {
            return {
              ...filter,
              isChecked: true
            }
          }
          return filter;
        })
      }
    case SET_UNCHECKED_FILTER:
      return {
        ...state,
        filters: [
          {
            ...state.filters.find(({ isAll }) => isAll),
            isChecked: false
          },
          ...state.filters.filter(({ isAll }) => !isAll).map((filter) => {
            if (filter.id === action.id) {
              return {
                ...filter,
                isChecked: false
              }
            }
            return filter;
          })
        ]
      }
    case SET_CHECKED_ALL_FILTERS:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          return {
            ...filter,
            isChecked: true
          }
        })
      }
    case SET_UNCHECKED_ALL_FILTERS:
      return {
        ...state,
        filters: state.filters.map((filter) => {
          return {
            ...filter,
            isChecked: false
          }
        })
      }
    case CHANGE_METHOD_SORT:
      return {
        ...state,
        methodSort: action.methodSort
      }
    default:
      return state;
  }
}

export const setSearchId = (searchId) => {
  return { type: SET_SEARCH_ID, searchId }
}

export const getSearchId = () => (dispatch) => {
  axios.get('https://front-test.beta.aviasales.ru/search')
    .then(({ data: { searchId } }) => {
      dispatch(setSearchId(searchId));
    });
}

export const setTickets = (tickets) => {
  return { type: SET_TICKETS, tickets }
}

export const getTickets = (searchId) => (dispatch) => {
  axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`)
    .then(({ data: { tickets } }) => {
      dispatch(setTickets(tickets));
    })
}

export const setCheckedFilter = (id) => {
  return { type: SET_CHECKED_FILTER, id }
}

export const setUncheckedFilter = (id) => {
  return { type: SET_UNCHECKED_FILTER, id }
}

export const setCheckedAllFilters = () => {
  return { type: SET_CHECKED_ALL_FILTERS }
}

export const setUncheckedAllFilters = () => {
  return { type: SET_UNCHECKED_ALL_FILTERS }
}

export const changeMethodSort = (methodSort) => {
  return { type: CHANGE_METHOD_SORT, methodSort }
}

export default reducer;
