import Entity from '../Entity/entity'
import styles from './navigation-bar.module.scss'

export default function NavigationBar() {
  return (
    <div className={styles.component}>
      <div className={styles.head}>
        <div className={styles.title}>
          <p>Название проекта</p>
          <span>Аббревиатура</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_3_4487)">
            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_3_4487">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <ul className={styles.list}>
        <Entity/>
      </ul>
    </div>
  )
}