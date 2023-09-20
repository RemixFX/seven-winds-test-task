import styles from './entity.module.scss'

export default function Entity() {
  return (
    <li className={styles.item}>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
        <g clip-path="url(#clip0_22601_115)">
          <path d="M2.75 11.9167H10.0833V2.75H2.75V11.9167ZM2.75 19.25H10.0833V13.75H2.75V19.25ZM11.9167 19.25H19.25V10.0833H11.9167V19.25ZM11.9167 2.75V8.25H19.25V2.75H11.9167Z" fill="white" />
        </g>
        <defs>
          <clipPath id="clip0_22601_115">
            <rect width="22" height="22" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className={styles.name}>Entity</p>
    </li>
  )
}