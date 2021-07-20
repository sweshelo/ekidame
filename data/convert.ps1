function get-Object($key){
    $j|%{
        if ($_.no -eq $key){
        return $_
        }
    }
}


$d = import-csv ./rawdata/data.txt -Header (@("id", "name")+@(1..80)+@("element", "type")+@(81..160))
$j = cat ./rawdata/denco.json | ConvertFrom-Json
$return = @()

"[" > data.json

$d | %{
    $denco = $_
    $hp = @()
    $ap = @()
    $r = get-Object($denco.id)
    @(1..80)|%{if ($denco.$_ -ne ''){$hp += $denco.$_}else{$hp += 'null'}}
    @(81..160)|%{if ($denco.$_ -ne ''){$ap += $denco.$_}else{$ap += 'null'}}

    #echo $r
    $name = $r.name
    $name_en=$r.name_en
    $no = [int]$r.no
    $element = $r.element
    $theme_color = $r.theme_color
    $description = $r.description -replace '"', '\"' 

    $hp = "$hp" -replace " ",", ";
    $ap = "$ap" -replace " ",", ";

    echo @"
    {
        "name" : "$name",
        "name_en" : "$name_en",
        "no" : $no,
        "element" : "$element",
        "theme_color" : "$theme_color",
        "description" : "$description",
        "hp" : [$hp],
        "ap" : [$ap]
    },
"@ >> data.json

}

"]" >> data.json
