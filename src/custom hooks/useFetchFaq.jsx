import { useQuery } from 'react-query'
import {
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore'
import * as firebase from '../Firebase/firebase'
import * as propertyCategory from '../Redux/actions/actions'

const useFetchFaq = () => {
  const { data } = useQuery('faq', () => {
    const faqRef = query(collection(firebase.db, 'faq'))

    let propArr = []
    onSnapshot(faqRef, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        propArr.push(doc.data())
        propertyCategory.getFaq(propArr)
      })
    })
  })

  return data
}

export default useFetchFaq
