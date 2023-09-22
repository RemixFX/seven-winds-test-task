import styles from './root.module.scss'
import Header from "../components/Header/header";
import NavigationBar from "../components/NavigationBar/navigation-bar";
import Table from '../components/Table/table';
export default function Root() {

  return (
    <div className={styles.page}>
    <Header />
    <NavigationBar />
    <Table/>
    </div>
  )
}

