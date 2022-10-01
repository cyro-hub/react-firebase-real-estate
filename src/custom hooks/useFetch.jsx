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
import { useMemo, useState } from 'react'

const useFetch = (category) => {

  const { data } = useQuery('newProperties', () => {
    const newSalesRef = query(
      collection(firebase.db, 'properties'),
      where('category', '==', category),
      orderBy('timeStamp', 'desc'),
      limit(40),
    )
    onSnapshot(newSalesRef, (querySnapshot) => {
      let propArr = []
      querySnapshot.forEach((doc) => {
        propArr.push(doc.data())
        if (category === 'sales') {
          return propertyCategory.getSales(propArr)
        }
        return propertyCategory.getRental(propArr)
      })
    })

    const trendingRef = query(
      collection(firebase.db, 'properties'),
      where('category', '==', category),
      orderBy('likes', 'desc'),
      limit(20),
    )
    onSnapshot(trendingRef, (querySnapshot) => {
      let propArr = []
      querySnapshot.forEach((doc) => {
        propArr.push(doc.data())
        if (category === 'sales') {
          return propertyCategory.getSalesTrending(propArr)
        }
        return propertyCategory.getRentalsTrending(propArr)
      })
    })
  })

  return data
}

export default useFetch
