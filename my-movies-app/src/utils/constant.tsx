export const IconDropDown = ({
  size = 12,
  color = "#99aabb",
  className = "",
  ...props
}) => {
  return (
    <svg
      width={size}
      height={(size * 11) / 18} // Giữ đúng tỉ lệ 18:11
      viewBox="611 775 18 11"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M620.0812 786 611.0012 776.91 612.9112 775 620.0812 782.17 627.0912 775.17 629.0012 777.08z" />
    </svg>
  );
};
