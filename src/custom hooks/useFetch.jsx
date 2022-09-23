import { useQuery } from 'react-query'
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from 'firebase/firestore'
import * as firebase from '../Firebase/firebase'
import * as propertyCategory from '../Redux/actions/actions'

const useFetch = (category) => {
  const { data } = useQuery('newProperties', () => {
    const newSalesRef = query(
      collection(firebase.db, 'properties'),
      where('category', '==', category),
      orderBy('timeStamp', 'desc'),
      limit(20),
    )

    let propArr = []
    onSnapshot(newSalesRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        propArr.push(doc.data())

        if (category === 'sales') {
          return propertyCategory.getSales(propArr)
        }
        return propertyCategory.getRental(propArr)
      })
    })
  })

  return data
}

export default useFetch
