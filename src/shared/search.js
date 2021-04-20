export const searchResults = (props, term) => {
    let projects = props.projects[props.keyName].data;
    let data = [];
    if (term) {
        let terms = term.split(/\s+/g);
        let regex = new RegExp(terms.join('|'), 'gi');
        projects.forEach((project) => {
            let [match, relevance] = matchingTerm(
                props,
                project,
                terms,
                regex
            );
            if (match) {
                data.push({
                    ...project,
                    relevance: -relevance,
                });
            }
        });
    }
    return data;
};

const matchingTerm = (props, project, terms, regex) => {
    let nameMatch = matchRegex(project.name, regex);
    let summaryMatch = matchRegex(project.summary, regex);
    let tags = props.state.tags;
    let technologies = props.state.technologies;
    let tagMatch = searchListVal(props, project, 'tags', regex);
    let categoryMatch = searchListVal(
        props,
        project,
        'technologies',
        regex
    );
    return matchRelevance(
        terms,
        nameMatch,
        summaryMatch,
        tagMatch,
        categoryMatch
    );
};

const matchRegex = (value, regex) => {
    let match = value.match(regex);
    return match ? match : [];
};

const searchListVal = (props, project, keyName, regex) => {
    let matches = [];
    let list = props.state[keyName];
    project[keyName].forEach((key) => {
        let match = matchRegex(list[key].name, regex);
        if (match.length > 0) {
            matches = [...matches, ...match];
        }
    });
    return matches;
};

const matchRelevance = (terms, ...matches) => {
    let mapping = {};
    let match = [].concat.apply([], matches);
    let containsAllTerms = false;
    if (match.length > 0) {
        match.forEach((entry) => {
            entry = entry.toLowerCase();
            if (!mapping[entry]) {
                mapping[entry] = 1;
            } else {
                mapping[entry]++;
            }
        });
        containsAllTerms =
            Object.keys(mapping).length === terms.length;
    }
    return [containsAllTerms, match.length];
};
