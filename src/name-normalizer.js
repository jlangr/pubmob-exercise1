function isInvalidName(fullName) {
  return fullName.split(',').length > 2;
}

export const normalize = fullName => {
  if (isInvalidName(fullName)) {
    throw new Error();
  }

  return normalizeValidName(fullName);
}

function normalizeValidName(fullName) {
    const [baseName,suffix] = fullName.split(',');

    const nameParts = baseName.trim().split(' ');
    if (isMononym(nameParts))
      return fullName;
    if (isDuonym(nameParts))
      return `${lastName(nameParts)}, ${firstName(nameParts)}`;
  
    return `${lastName(nameParts)}, ${firstName(nameParts)} ${middleNames(nameParts)}${suffixIfPresent(suffix)}`;
  
}

function suffixIfPresent(suffix) {
  if (suffix) return `,${suffix}`
  return '';
}

function lastName(nameParts) {
  return nameParts[nameParts.length - 1];
}

function firstName(nameParts) {
  return nameParts[0];
}

function middleNames(nameParts) {
    return nameParts.slice(1, -1).map(middleInitial).join(' ');
}

function middleInitial(namePart) {
  if (namePart.length === 1) {
    return namePart;
  }
  return `${namePart[0]}.`;
}

function isMononym(nameParts) {
  return nameParts.length === 1;
}

function isDuonym(nameParts) {
  return nameParts.length === 2;
}
