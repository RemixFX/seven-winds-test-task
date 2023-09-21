import styles from './root.module.scss'
import Header from "../components/Header/header";
import NavigationBar from "../components/NavigationBar/navigation-bar";
import Table from '../components/Table/table';
import { useGetTreeRowsQuery } from '../api';
import { ID } from '../config/consts';

export default function Root() {

  const { data, error, isLoading } = useGetTreeRowsQuery(ID)
  


  return (
    <div className={styles.page}>
    <Header />
    <NavigationBar />
    <Table/>
    </div>
  )
}

