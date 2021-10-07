export const activeCities = (cityCode: number): boolean => {
  if (isNaN(cityCode)) {
    return true;
  }
  if (
    cityCode !== 1 &&
    cityCode !== 2 &&
    cityCode !== 3 &&
    cityCode !== 1657 &&
    cityCode !== 1656 &&
    cityCode !== 1660 &&
    cityCode !== 1658 &&
    cityCode !== 1690 &&
    cityCode !== 1655 &&
    cityCode !== 1685 &&
    cityCode !== 1687 &&
    cityCode !== 1686 &&
    cityCode !== 1688 &&
    cityCode !== 1675 &&
    cityCode !== 1663 &&
    cityCode !== 1684
  )
    return true;
  else return false;
};
